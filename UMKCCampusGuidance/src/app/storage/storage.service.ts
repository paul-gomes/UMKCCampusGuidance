import { Injectable } from "@angular/core";
import { User } from "./user";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Topic } from "./topic";
import { Itopics } from "./topics";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private user: User;
  private scheduleCollection;

  constructor(private firestore: AngularFirestore) {
    // this.createUser(username);
    // read from firebase if exists
    this.scheduleCollection = this.firestore.collection("/schedules");
  }

  signOut() {
    this.user = null;
  }

  loadUser(username: string, callback) {
    if (this.user !== undefined && this.user !== null) {
      if (this.user.username === username) {
        callback();
        return;
      }
    }

    this.user = { id: null, username, schedule: { courseList: [] } };

    const userRef = this.firestore.collection("schedules", (ref) => {
      return ref.where("username", "==", username).limit(1);
    });

    const userColl = userRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          console.log(a.payload.doc.id);
          this.user.id = a.payload.doc.id;
          const data = a.payload.doc.data();
          console.log(data["username"]);
          return a.payload.doc.data();
        })
      )
    );

    // calls to firestore are async so have to be nested
    userColl.forEach((doc) => {
      if (doc.length === 0) {
        // user does not exist, so create user
        this.scheduleCollection
          .add({
            username,
          })
          .then(
            (res) => {
              this.user.id = res.id;
              console.log("added user: " + username + "; id: " + this.user.id);
              callback();
            },
            (err) => console.log(err)
          );
      } else {
        // existing user, check for courses
        const courseRef = this.firestore
          .collection("/schedules")
          .doc(this.user.id)
          .collection("courses", (ref) => {
            return ref;
          });

        const courseColl = courseRef.snapshotChanges().pipe(
          map((actions) =>
            actions.map((a) => {
              const data = a.payload.doc.data();
              let syllabus: Topic[] = null;
              if (data.syllabus !== "null") {
                syllabus = JSON.parse(data.syllabus);

                // syllabus.forEach(topic => {
                //     const dateArray = topic.date
                //       topic.date = topic.date
                //   })
              }

              this.user.schedule.courseList.push({
                id: a.payload.doc.id,
                name: data.name,
                building: data.building,
                roomNumber: data.roomNumber,
                days: data.days,
                startTime: data.startTime,
                endTime: data.endTime,
                syllabus,
              });
              return data;
            })
          )
        );

        courseColl.forEach(() => {
          callback();
        });
      }
    });
  }

  addSchedule(scheduleText, callback) {
    const courseNameList = [];
    // RegEx so all are replaced not just the first
    let words = scheduleText.replace(new RegExp("\n", "g"), "").split(" ");
    words.forEach((word, index) => {
      if (word.includes("(") && word.includes("(")) {
        courseNameList.push(
          "" +
            words[index - 3] +
            " " +
            words[index - 2] +
            " " +
            words[index - 1]
        );
      }
    });

    let courseIndex = 0;
    const lines = scheduleText.split("\n");
    words = lines[lines.length - 1].split(" ");
    words.forEach((word, index) => {
      if (word === "-") {
        let building = "" + words[index + 2];
        if (words[index + 3].replace("-Rm", "") !== "") {
          building += " " + words[index + 3].replace("-Rm", "");
        }
        this.user.schedule.courseList.push({
          id: null,
          name: courseNameList[courseIndex],
          building,
          roomNumber: words[index + 4],
          days: words[index - 2],
          startTime: words[index - 1],
          endTime: words[index + 1],
          syllabus: null,
        });
        courseIndex++;
      }
    });

    this.addSyllabus(0, [
      { date: "4/29", topic: "Bubble Sort" },
      { date: "5/3", topic: "Quick Sort" },
      { date: "5/9", topic: "Merge Sort" },
      { date: "5/15", topic: "Heap Sort" },
    ]);
    this.addSyllabus(1, [
      { date: "4/30", topic: "MEAN Stack" },
      { date: "5/4", topic: "Angular" },
      { date: "5/10", topic: "Express JS" },
      { date: "5/16", topic: "Javascript" },
    ]);
    this.addSyllabus(3, [
      { date: "4/31", topic: "Java" },
      { date: "5/5", topic: "C++" },
      { date: "5/11", topic: "Javascript" },
      { date: "5/17", topic: "Python" },
    ]);

    this.user.schedule.courseList.forEach((course, index) => {
      const courseObj = {
        name: course.name,
        building: course.building,
        roomNumber: course.roomNumber,
        days: course.days,
        startTime: course.startTime,
        endTime: course.endTime,
        syllabus: JSON.stringify(course.syllabus),
      };
      this.scheduleCollection
        .doc(this.user.id)
        .collection("courses")
        .add(courseObj)
        .then(
          (res) => {
            this.user.schedule.courseList[index].id = res.id;
            console.log("added course id: " + res.id);
          },
          (err) => console.log(err)
        )
        .then(() => callback());
    });
  }

  addSyllabus(courseIndex, syllabus) {
    this.user.schedule.courseList[courseIndex].syllabus = syllabus;
  }

  getCourseList() {
    if (!this.user) {
      return null;
    }
    return this.user.schedule.courseList;
  }

  getUser() {
    return this.user;
  }

  getBuildings() {
    const buildings = [];
    if (!this.user) {
      return buildings;
    }
    this.user.schedule.courseList.forEach((course) => {
      if (!buildings.some((x) => x.courseName === course.name)) {
        buildings.push({
          courseName: course.name,
          building: course.building,
          room: course.roomNumber,
        });
      }
    });
    return buildings;
  }

  // returns the most recent upcoming topic for each class
  getTopics() {
    const selTopics: Itopics[] = [];

    let selTopic = "";
    let selDateStr = "";
    let selDate;
    const currentDate = new Date();
    this.user.schedule.courseList.forEach((course) => {
      if (course.syllabus !== undefined && course.syllabus !== null) {
        selTopic = "";

        course.syllabus.forEach((topic) => {
          const dateStrArray = topic.date.split("/");
          // tslint:disable-next-line:radix
          const topicDate = new Date(
            currentDate.getUTCFullYear(),
            parseInt(dateStrArray[0]) - 1,
            parseInt(dateStrArray[1])
          );

          if (selTopic === "") {
            selTopic = topic.topic;
            selDateStr = topic.date;
            selDate = topicDate;
          } else if (selDate < currentDate && topicDate > selDate) {
            selTopic = topic.topic;
            selDateStr = topic.date;
            selDate = topicDate;
          } else if (topicDate >= currentDate && topicDate < selDate) {
            selTopic = topic.topic;
            selDateStr = topic.date;
            selDate = topicDate;
          }
        });

        if (selTopic !== "") {
          if (!selTopics.some((x) => x.courseName === course.name)) {
            selTopics.push({
              courseName: course.name,
              topic: selTopic,
              date: selDateStr,
            });
          }
        }
      }
    });
    console.log(selTopics);
    return selTopics;
  }
}

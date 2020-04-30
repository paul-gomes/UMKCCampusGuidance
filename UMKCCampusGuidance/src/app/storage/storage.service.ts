import {Injectable} from '@angular/core';
import {User} from './user';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Topic} from './topic';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private user: User;
  private scheduleCollection;

  constructor(private firestore: AngularFirestore) {
    // this.createUser(username);
    // read from firebase if exists
    this.scheduleCollection = this.firestore.collection('/schedules');
  }

  loadUser(username: string, callback) {
    if (this.user !== undefined && this.user !== null) {
      if (this.user.username === username) {
        callback();
        return;
      }
    }

    this.user = {id: null, username, schedule: {courseList: []}};

    const userRef = this.firestore.collection('schedules', ref => {
      return ref.where('username', '==', username).limit(1);
    });

    const userColl = userRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          console.log(a.payload.doc.id);
          this.user.id = a.payload.doc.id;
          const data = a.payload.doc.data();
          console.log(data['username']);
          return a.payload.doc.data();
        }))
    );

    // calls to firestore are async so have to be nested
    userColl.forEach(doc => {
      if (doc.length === 0) { // user does not exist, so create user
        this.scheduleCollection.add({
          username
        }).then(
            (res) => {
              this.user.id = res.id;
              console.log('added user: ' + username + '; id: ' + this.user.id);
              callback();
            },
            err => console.log(err)
        );

      } else { // existing user, check for courses
        const courseRef = this.firestore.collection('/schedules').doc(this.user.id).collection('courses', ref => {
          return ref;
        });

        const courseColl = courseRef.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              let syllabus: Topic[] = null;
              if (data.syllabus !== 'null') {
                syllabus = JSON.parse(data.syllabus);

                // syllabus.forEach(topic => {
                //     const dateArray = topic.date
                //       topic.date = topic.date
                //   })
              }

              this.user.schedule.courseList.push({id: a.payload.doc.id, name: data.name, building: data.building,
                  roomNumber: data.roomNumber, days: data.days, startTime: data.startTime, endTime: data.endTime, syllabus});
              return data;
            }))
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
    let words = scheduleText.replace(new RegExp('\n', 'g'), '').split(' ');
    words.forEach((word, index) => {
      if (word.includes('(') && word.includes('(')) {
        courseNameList.push('' + words[index - 3] + ' ' +  words[index - 2] + ' ' + words[index - 1]);
      }
    });

    let courseIndex = 0;
    const lines = scheduleText.split('\n');
    words = lines[lines.length - 1].split(' ');
    words.forEach((word, index) => {
      if (word === '-') {
        let building = '' + words[index + 2];
        if (words[index + 3].replace('-Rm', '') !== '') {
          building += ' ' + words[index + 3].replace('-Rm', '');
        }
        this.user.schedule.courseList.push(
            { id: null, name: courseNameList[courseIndex], building, roomNumber: words[index + 4], days: words[index - 2],
                startTime: words[index - 1], endTime: words[index + 1], syllabus: null });
        courseIndex++;
      }
    });

    this.addSyllabus(0);

    this.user.schedule.courseList.forEach((course, index) => {
      const courseObj = { name: course.name, building: course.building, roomNumber: course.roomNumber, days: course.days,
          startTime: course.startTime, endTime: course.endTime, syllabus: JSON.stringify(course.syllabus)};
      this.scheduleCollection.doc(this.user.id).collection('courses').add(courseObj).then(
          (res) => {
            this.user.schedule.courseList[index].id = res.id;
            console.log('added course id: ' + res.id);
          },
          err => console.log(err)
      ).then(() => callback());
    });
  }

  addSyllabus(courseIndex) {
      this.user.schedule.courseList[courseIndex].syllabus = [
          {date: '4/29', topic: 'Bubble Sort'},
          {date: '5/3', topic: 'Quick Sort'},
          {date: '5/9', topic: 'Merge Sort'},
          {date: '5/15', topic: 'Heap Sort'}];

    // TODO: add to firestore
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
      this.user.schedule.courseList.forEach(course => {
          buildings.push({courseName: course.name, building: course.building, room: course.roomNumber});
      });
      return buildings;
  }

  // wrapper
  compareArrays(dateArray, dateArray2) {
    if (dateArray2 === undefined) {
      return false;
    }
    return this.compareDates(dateArray.month, dateArray.day, dateArray2.month, dateArray2.day);
  }

  // wrapper
  compare(dateArray, date) {
    return this.compareDates(dateArray.month, dateArray.day, date.getMonth(), date.getUTCDay());
  }

  // returns true if date1 >= date2; returns false if date1 < date2
  compareDates(month1, day1, month2, day2) {
    if (month1 > month2) {
        return true;
    } else if (month1 < month2) {
        return false;
    } else { // months are equal
        if (day1 >= day2) {
            return true;
        }
        return false;
    }
  }

  getTopic() {
      this.addSyllabus(0);

      let selTopic = '';
      let selDate;
      const currentDate = new Date(); // new Date().format('m-d-Y');
      this.user.schedule.courseList.forEach(course => {
          if (course.syllabus !== undefined && course.syllabus !== null) {
              course.syllabus.forEach(topic => {
                  const dateStrArray = topic.date.split('/');
                  // tslint:disable-next-line:radix
                  const dateArray = { month: parseInt(dateStrArray[0]), day: parseInt(dateStrArray[1]) };
                  console.log(this.compare(dateArray, currentDate));
                  console.log(this.compareArrays(dateArray, selDate));
                  if (this.compare(dateArray, currentDate) && !this.compareArrays(dateArray, selDate)) {
                      selTopic = topic.topic;
                      // tslint:disable-next-line:radix
                      selDate = dateArray;
                  }
              });
          }
      });
      return selTopic;
  }
}

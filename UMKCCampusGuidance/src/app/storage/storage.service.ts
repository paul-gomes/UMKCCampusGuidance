import { Injectable } from '@angular/core';
import { User } from './user';
import { Schedule } from './schedule';
import { Course } from './course';
import { Location } from './location';
import { Topic } from './topic';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

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

  createUser(username: string) {
    // const userDoc =  this.scheduleCollection.doc('tanya').collection('/courses');
    //
    // this.scheduleCollection.doc('tanya').update({
    //   schedule: 'd'
    // }).then(
    //     (res) => {
    //       console.log('updated');
    //     },
    //     err => console.log(err)
    // );
    //
    // const scheduleRef = this.firestore.collection('/schedules', ref => {
    //   return ref;
    // });
    //
    // const questionsCol = scheduleRef.snapshotChanges().pipe(
    //     map(actions => actions.map(a => {
    //       return a.payload.doc.data(); // get id using a.payload.doc.id
    //     }))
    // );
    //
    // questionsCol.forEach(doc => {
    //   console.log(doc);
    // });
    //
    // const fd = this.firestore.firestore.collection('/schedules').get();
    //
    // const n = this.firestore.collection('/schedules').doc('tanya').get();


    this.user = new User('u3Edl5IgLLfJmC8ncj6E', username, new Schedule([]));

    this.retrieveCourses().then(response => {
      if (response) {
        console.log('t');
      } else {
        console.log('false');
      }
    });
    // retrieving from firebase is async
    // this.retrieveUser(username).then(() => {
    //   console.log('yes')
    //   if (this.user.getId() === null) {
    //     this.scheduleCollection.add({
    //       username
    //     }).then(
    //         (res) => {
    //           this.user.setId(res.id);
    //           console.log('added user: ' + username + '; id: ' + this.user.getId());
    //         },
    //         err => console.log(err)
    //     );
    //   } else {
    //     // existing user, so check for schedule in firestore
    //
    //     if (this.user.getSchedule() == null) {
    //       // tslint:disable-next-line:max-line-length
    //       const scheduleText = 'COMP-SCI 5540-0001 LEC (14110) \nCOMP-SCI 5551-0001 LEC (11505) \nCOMP-SCI 5552A-0001 LEC (13498) \nCOMP-SCI 5592-0001 LEC (14041) \nTuTh 1:00PM - 2:15PM Royall Hall-Rm 00111 TuTh 5:30PM - 6:45PM Flarsheim Hall-Rm 00460 MoWeFr 3:00PM - 3:50PM Haag Hall-Rm 00109 TuTh 10:00AM - 11:15AM Bloch -Rm 00002 ';
    //       this.addSchedule(scheduleText);
    //     }
    //   }
    // });
  }

  retrieveUser(username): Promise<boolean> {
    const userRef = this.firestore.collection('schedules', ref => {
      return ref.where('username', '==', username).limit(10);
    });

    const userColl = userRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          console.log(a.payload.doc.id);
          this.user.setId(a.payload.doc.id);
          const data = a.payload.doc.data();
          console.log(data['username']);
          return a.payload.doc.data();
        }))
    );

    // wait for query to continue execution, because firebase calls are async
    return userColl.forEach((doc) => {
      console.log(doc);
      return true;
    }).then(resp => {
      console.log(resp);
      return true;
    },
    err => {
      console.log(err);
      return true;
    });
  }

  retrieveCourses(): Promise<boolean> {
    const courseRef = this.firestore.collection('/schedules').doc(this.user.getId()).collection('courses', ref => {
      return ref;
    });

    const courseColl = courseRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          console.log(a.payload.doc.id);
          const data = a.payload.doc.data();
          let syllabus = null;
          if (data['syllabus'] !== 'null') {
            syllabus = JSON.parse(data['syllabus']);
          }
          console.log(syllabus);

          this.user.addCourse({id: a.payload.doc.id, name: data['name'], location: data['location'],
            days: data['days'], startTime: data['startTime'], endTime: data['endTime'], syllabus});
          return data;
        }))
    );

    return courseColl.forEach(() => {}).then(() => true);
  }

  addSchedule(scheduleText) {
    const courseNameList = [];
    // RegEx so all are replaced not just the first
    let words = scheduleText.replace(new RegExp('\n', 'g'), '').split(' ');
    words.forEach((word, index) => {
      if (word.includes('(') && word.includes('(')) {
        courseNameList.push('' + words[index - 3] + ' ' +  words[index - 2] + ' ' + words[index - 1]);
      }
    });

    let courseIndex = 0;
    const courseList = [];
    const lines = scheduleText.split('\n');
    words = lines[lines.length - 1].split(' ');
    words.forEach((word, index) => {
      if (word === '-') {
        let building = '' + words[index + 2];
        if (words[index + 3].replace('-Rm', '') !== '') {
          building += ' ' + words[index + 3].replace('-Rm', '');
        }
        const location = {building , roomNumber: words[index + 4]};
        courseList.push(
            { id: null, name: courseNameList[courseIndex], location, days: words[index - 2], startTime: words[index - 1],
              endTime: words[index + 1], syllabus: null });
        courseIndex++;
      }
    });

    this.user.setSchedule(new Schedule(courseList));
    this.addSyllabus(0);

    this.user.getSchedule().getCourseList().forEach((course, index) => {
      const courseObj = { name: course.name, location: JSON.stringify(course.location), days: course.days, startTime: course.startTime,
          endTime: course.endTime, syllabus: JSON.stringify(course.syllabus)};
      this.scheduleCollection.doc(this.user.getId()).collection('courses').add(courseObj).then(
          (res) => {
            this.user.getSchedule().getCourseList()[index].id = res.id;
            console.log('added course id: ' + res.id);
          },
          err => console.log(err)
      );
    });
  }

  storeSyllabusInFirebase() {

  }

  getUserFromFirebase(useranme) {
    return false;
  }

  addSyllabus(courseIndex) {
    const courseList = [{ date: '4/28', topic: 'Bubble Sort' }, { date: '5/1', topic: 'Quick Sort'},
      { date: '5/8', topic: 'Merge Sort' }, { date: '5/15', topic: 'Heap Sort' }];
    this.user.setSyllabusForCourse(courseIndex, courseList);
    console.log(JSON.stringify(courseList));
    console.log(JSON.parse(JSON.stringify(courseList)));
  }

  getSchedule() {
    if (!this.user) {
      return null;
    }
    return this.user.getSchedule();
  }

  getCourseList() {
    if (!this.user) {
      return null;
    }
    return this.user.getSchedule().getCourseList();
  }

  getUser() {
    return this.user;
  }
}

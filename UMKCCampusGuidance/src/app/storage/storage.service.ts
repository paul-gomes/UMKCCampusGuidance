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
  private static SCHEDULE_COLLECTION = 'umkccampusguidance/schedules';
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


    this.user = new User(username, null);
    this.getUserId(username);
    if (this.user.getId() === null) {
      this.scheduleCollection.add({
        username
      }).then(
          (res) => {
            console.log(res);
            console.log('added user' + username);
          },
          err => console.log(err)
      );
    }

    if (this.user.getSchedule() == null) {
      // tslint:disable-next-line:max-line-length
      const scheduleText = 'COMP-SCI 5540-0001 LEC (14110) \nCOMP-SCI 5551-0001 LEC (11505) \nCOMP-SCI 5552A-0001 LEC (13498) \nCOMP-SCI 5592-0001 LEC (14041) \nTuTh 1:00PM - 2:15PM Royall Hall-Rm 00111 TuTh 5:30PM - 6:45PM Flarsheim Hall-Rm 00460 MoWeFr 3:00PM - 3:50PM Haag Hall-Rm 00109 TuTh 10:00AM - 11:15AM Bloch -Rm 00002 ';
      this.addSchedule(scheduleText);
    }
  }

  getUserId(username) {
    const userRef = this.firestore.collection('schedules', ref => {
      return ref.where('username', '==', username).limit(10);
    });

    // const userColl =
    userRef.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          console.log(a.payload.doc.id)
          this.user.setId(a.payload.doc.id);
          // read schedule
          // return a.payload.doc.data();
        }))
    );

    // userColl.forEach(doc => {
    //   console.log(doc);
    // });
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
        const location = new Location(building , words[index + 4]);
        courseList.push(
            new Course(courseNameList[courseIndex], location, words[index - 2], words[index - 1], words[index + 1], null)
        );
        courseIndex++;
      }
    });

    this.user.setSchedule(new Schedule(courseList));
    this.storeUserInFirebase();
  }

  storeUserInFirebase() {

  }

  storeSyllabusInFirebase() {

  }

  getUserFromFirebase(useranme) {
    return false;
  }

  addSyllabus(courseIndex) {
    const courseList = [ new Topic('4/25', 'Bubble Sort'), new Topic('5/1', 'Quick Sort'),
      new Topic('5/8', 'Merge Sort'), new Topic('5/15', 'Heap Sort')];
    this.user.setSyllabusForCourse(courseIndex, courseList);
    this.storeSyllabusInFirebase();
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

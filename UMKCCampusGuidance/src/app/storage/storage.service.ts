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

  loadUser(username: string, callback) {
    if (this.user !== undefined && this.user !== null) {
      if (this.user.getUsername() === username) {
        callback();
        return;
      }
    }

    this.user = new User(null, username, new Schedule([]));

    const userRef = this.firestore.collection('schedules', ref => {
      return ref.where('username', '==', username).limit(1);
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

    // calls to firestore are async so have to be nested
    userColl.forEach(doc => {
      if (doc.length === 0) { // user does not exist, so create user
        this.scheduleCollection.add({
          username
        }).then(
            (res) => {
              this.user.setId(res.id);
              console.log('added user: ' + username + '; id: ' + this.user.getId());
              callback();
            },
            err => console.log(err)
        );

      } else { // existing user, check for courses
        const courseRef = this.firestore.collection('/schedules').doc(this.user.getId()).collection('courses', ref => {
          return ref;
        });

        const courseColl = courseRef.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data();
              let syllabus = null;
              if (data['syllabus'] !== 'null') {
                syllabus = JSON.parse(data['syllabus']);
              }

              this.user.addCourse({id: a.payload.doc.id, name: data['name'], location: data['location'],
                days: data['days'], startTime: data['startTime'], endTime: data['endTime'], syllabus});
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
      ).then(() => callback());
    });
  }

  addSyllabus(courseIndex) {
    const courseList = [{ date: '4/28', topic: 'Bubble Sort' }, { date: '5/1', topic: 'Quick Sort'},
      { date: '5/8', topic: 'Merge Sort' }, { date: '5/15', topic: 'Heap Sort' }];
    this.user.setSyllabusForCourse(courseIndex, courseList);
    console.log(JSON.stringify(courseList));
    console.log(JSON.parse(JSON.stringify(courseList)));
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

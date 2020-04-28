import { Injectable } from '@angular/core';
import { User } from './user';
import { Schedule } from './schedule';
import { Course } from './course';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private user: User;

  constructor(username) {
    this.createUser(username);

    // read from firebase if exists
  }

  createUser(username) {
    this.user = new User(username, null);

    const scheduleText =
        'COMP-SCI 5540-0001 LEC (14110) \n' +
        'COMP-SCI 5551-0001 LEC (11505) \n' +
        'COMP-SCI 5552A-0001 LEC (13498) \n' +
        'COMP-SCI 5592-0001 LEC (14041) \n' +
        // tslint:disable-next-line:max-line-length
        'TuTh 1:00PM - 2:15PM Royall Hall-Rm 00111 TuTh 5:30PM - 6:45PM Flarsheim Hall-Rm 00460 MoWeFr 3:00PM - 3:50PM Haag Hall-Rm 00109 TuTh 10:00AM - 11:15AM Bloch -Rm 00002 ';
    this.addSchedule(scheduleText);
  }

  addSchedule(scheduleText) {
    // COMP-SCI 5540-0001 LEC (14110)
    // COMP-SCI 5551-0001 LEC (11505)
    // COMP-SCI 5552A-0001 LEC (13498)
    // COMP-SCI 5592-0001 LEC (14041)
    // tslint:disable-next-line:max-line-length
    // TuTh 1:00PM - 2:15PM Royall Hall-Rm 00111 TuTh 5:30PM - 6:45PM Flarsheim Hall-Rm 00460 MoWeFr 3:00PM - 3:50PM Haag Hall-Rm 00109 TuTh 10:00AM - 11:15AM Bloch -Rm 00002

    const courseNameList = [];
    let words = scheduleText.replace('\n', '').split(' ');
    words.forEach((word, index) => {
      if (word.includes('(') && word.includes('(')) {
        courseNameList.push('' + words[index - 3] + words[index - 2] + words[index - 1]);
      }
    });

    let courseIndex = 0;
    const courseList = [];
    const lines = scheduleText.split('\n');
    words = lines[lines.length - 1].split(' ');
    words.forEach((word, index) => {
      if (word === '-') {
        let building = '' + words[index + 2];
        if (words[index + 3].replace('-Rm') === '') {
          building += words[index + 3].replace('-Rm');
        }
        const location = new Location(building , words[index - 2]);
        courseList.push( new Course(courseNameList[courseIndex], location, words[index - 2], words[index - 1], words[index + 1], null));
        courseIndex++;
      }
    });


    this.user.setSchedule(new Schedule(courseList));
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
    return this.user.getSchedule().courseList;
  }
}

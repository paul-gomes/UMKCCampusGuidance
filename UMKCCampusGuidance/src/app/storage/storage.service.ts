import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private user: User

  constructor() {
    this.user = new User();
  }

  getSchedule() {
    return this.user.schedule;
  }

  getCourseList() {
    return this.user.schedule.courseList;
  }
}

import { Course } from './course';

export class Schedule {
    readonly courseList: Course[];

    constructor(courseList) {
        this.courseList = courseList;
    }
}

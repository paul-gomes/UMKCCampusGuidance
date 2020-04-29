import { Course } from './course';

export class Schedule {
    private courseList: Course[];

    constructor(courseList) {
        this.courseList = courseList;
    }

    getCourseList() {
        return this.courseList;
    }

    getCourseAtIndex(index) {
        return this.courseList[index];
    }
}

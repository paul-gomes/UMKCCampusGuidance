import { Course } from './course';

export class Schedule {
    readonly courseList: Course[];

    constructor() {
        this.courseList = [
            new Course('', '', '', '', '', ''),
            new Course('', '', '', '', '', '')
        ];
    }
}

import { Topic } from './topic';

export class Course {
    private name: string;
    private courseNumber: string;
    private location: Location;
    private days: string;
    private time: string;
    private syllabus: Topic[];

    constructor(name, courseNumber, location, days, time, syllabus) {
        this.name = name;
        this.courseNumber = courseNumber;
        this.location = location;
        this.days = days;
        this.time = time;
        this.syllabus = syllabus;
    }
}

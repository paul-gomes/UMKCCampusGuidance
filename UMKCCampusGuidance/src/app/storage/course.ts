import { Topic } from './topic';
import {Time} from '@angular/common';

export class Course {
    private id: string;
    private name: string;
    private location: Location;
    private days: string;
    private startTime: Time;
    private endTime: Time;
    private syllabus: Topic[];

    constructor(name, location, days, startTime, endTime, syllabus) {
        this.name = name;
        this.location = location;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
        this.syllabus = syllabus;
    }

    setSyllabus(syllabus: Topic[]) {
        this.syllabus = syllabus;
    }
}

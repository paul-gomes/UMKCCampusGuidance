import { Schedule } from './schedule';

export class User {
    private id: string;
    private username: string;
    private schedule: Schedule;

    constructor(id, username, schedule) {
        this.id = id;
        this.username = username;
        this.schedule = schedule;
    }

    getUsername() {
        return this.username;
    }

    setId(id: string) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setSchedule(schedule) {
        this.schedule = schedule;
    }

    getSchedule() {
        return this.schedule;
    }

    setSyllabusForCourse(courseIndex, syllabus) {
        this.schedule.getCourseAtIndex(courseIndex).syllabus = syllabus;
    }

    addCourse(course) {
        this.schedule.getCourseList().push(course);
    }
}

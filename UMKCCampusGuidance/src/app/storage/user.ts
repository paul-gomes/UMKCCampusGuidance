import { Schedule } from './schedule';

export class User {
    private id: string;
    private username: string;
    private schedule: Schedule;

    constructor(username, schedule) {
        this.id = null;
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
        this.schedule.getCourseAtIndex(courseIndex).setSyllabus(syllabus);
    }
}

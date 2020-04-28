import { Schedule } from './schedule';

export class User {
    private username: string;
    private schedule: Schedule;

    constructor(username, schedule) {
        this.username = username;
        this.schedule = schedule;
    }

    setSchedule(schedule) {
        this.schedule = schedule;
    }

    getSchedule() {
        return this.schedule;
    }
}

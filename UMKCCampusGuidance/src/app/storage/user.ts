import { Schedule } from './schedule';

export class User {
    private username: string;
    readonly schedule: Schedule;

    constructor() {
        this.username = 'tanisimova';
        this.schedule = new Schedule();
    }
}

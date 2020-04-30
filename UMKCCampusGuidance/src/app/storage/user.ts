import { Schedule } from './schedule';

export interface User {
    id: string;
    username: string;
    schedule: Schedule;
}

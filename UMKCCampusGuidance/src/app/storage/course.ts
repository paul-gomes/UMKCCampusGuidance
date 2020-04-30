import { Topic } from './topic';
import { Time } from '@angular/common';

export interface Course {
    id: string;
    name: string;
    building: string;
    roomNumber: number;
    days: string;
    startTime: string; // Time
    endTime: string; // Time;
    syllabus: Topic[];
}

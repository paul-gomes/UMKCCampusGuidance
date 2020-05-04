import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private storage: StorageService) {
    this.storage.loadUser('test', () => {
      // called when user function is ready

      if (this.storage.getCourseList().length === 0) {
        // tslint:disable-next-line:max-line-length
        const scheduleText = 'COMP-SCI 5540-0001 LEC (14110) \nCOMP-SCI 5551-0001 LEC (11505) \nCOMP-SCI 5552A-0001 LEC (13498) \nCOMP-SCI 5592-0001 LEC (14041) \nTuTh 1:00PM - 2:15PM Royall Hall-Rm 00111 TuTh 5:30PM - 6:45PM Flarsheim Hall-Rm 00460 MoWeFr 3:00PM - 3:50PM Haag Hall-Rm 00109 TuTh 10:00AM - 11:15AM Bloch -Rm 00002 ';

        this.storage.addSchedule(scheduleText, () => {
          console.log(JSON.stringify(this.storage.getBuildings()));
          console.log(JSON.stringify(this.storage.getTopic()));
        });
      } else {
        console.log(JSON.stringify(this.storage.getBuildings()));
        console.log(JSON.stringify(this.storage.getTopic()));
      }
    });
  }
}

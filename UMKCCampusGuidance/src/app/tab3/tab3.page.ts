import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {AlertController} from '@ionic/angular';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  ASEneCal;
  ASEPrevCal;

  ASEev = {
    ASEti: '',
    ASEde: '',
    ASEstaTime: '',
    ASEenTime: '',
    ASEalDay: false
  };

  ASEmiDate = new Date().toISOString();

  ASEevSource = [];
  ASEvieTitle;

  ASECalendar = {
    ASEmo: 'week',
    ASEcuDate: new Date(),
  };

  CC = 'collapseCard';

  // @ts-ignore
  @ViewChild(CalendarComponent) ASEmyCal: CalendarComponent;

  constructor(private ASEalCtrl: AlertController, @Inject(LOCALE_ID) private ASElo: string) { }

  ngOnInit() {
    // this.ASEreEvent();
  }

  ReturnToday() {
    this.ASECalendar.ASEcuDate = new Date();
  }

  ASEreEvent() {
    this.ASEev = {
      ASEti: '',
      ASEde: '',
      ASEstaTime: new Date().toISOString(),
      ASEenTime: new Date().toISOString(),
      ASEalDay: false
    };
  }

  ASEadEvent() {
    const ASEevCopy = {
      title: this.ASEev.ASEti,
      startTime:  new Date(this.ASEev.ASEstaTime),
      endTime: new Date(this.ASEev.ASEenTime),
      allDay: this.ASEev.ASEalDay,
      desc: this.ASEev.ASEde
    };

    if (ASEevCopy.allDay) {
      const ASEsta = ASEevCopy.startTime;
      const ASEen = ASEevCopy.endTime;

      ASEevCopy.startTime = new Date(Date.UTC(ASEsta.getUTCFullYear(), ASEsta.getUTCMonth(), ASEsta.getUTCDate()));
      ASEevCopy.endTime = new Date(Date.UTC(ASEen.getUTCFullYear(), ASEen.getUTCMonth(), ASEen.getUTCDate() + 1));
    }

    this.ASEevSource.push(ASEevCopy);
    this.ASEmyCal.loadEvents();
    this.ASEreEvent();
  }

  ASEneCalendar() {
    this.ASEneCal = document.querySelector('.swiper-container');
    this.ASEneCal.slideNext();
  }

  ASEbaCalender() {
    this.ASEPrevCal = document.querySelector('.swiper-container');
    this.ASEPrevCal.slidePrev();
  }

  async ASEEveSelected(ASEev) {
    const start = formatDate(ASEev.startTime, 'medium', this.ASElo);
    const end = formatDate(ASEev.endTime, 'medium', this.ASElo);

    const ASEal = await this.ASEalCtrl.create({
      header: ASEev.title,
      subHeader: ASEev.desc,
      message: 'from: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    await ASEal.present();
  }

  ASEViTiChanged(ASEti) {
    this.ASEvieTitle = ASEti;
  }

  ASETiSelected(ASE) {
    const ASEse = new Date(ASE.selectedTime);
    this.ASEev.ASEstaTime = ASEse.toISOString();
    ASEse.setHours(ASEse.getHours() + 1);
    this.ASEev.ASEenTime = (ASEse.toISOString());
  }

  ASEchMode(ASEx) {
    this.ASECalendar.ASEmo = ASEx;
  }
}

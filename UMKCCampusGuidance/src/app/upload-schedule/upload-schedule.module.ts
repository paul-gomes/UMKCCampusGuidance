import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadSchedulePageRoutingModule } from './upload-schedule-routing.module';

import { UploadSchedulePage } from './upload-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadSchedulePageRoutingModule
  ],
  declarations: [UploadSchedulePage]
})
export class UploadSchedulePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadSyllabusPageRoutingModule } from './upload-syllabus-routing.module';

import { UploadSyllabusPage } from './upload-syllabus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadSyllabusPageRoutingModule
  ],
  declarations: [UploadSyllabusPage]
})
export class UploadSyllabusPageModule {}

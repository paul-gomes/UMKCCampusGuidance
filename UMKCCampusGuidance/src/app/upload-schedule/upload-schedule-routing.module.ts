import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadSchedulePage } from './upload-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: UploadSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadSchedulePageRoutingModule {}

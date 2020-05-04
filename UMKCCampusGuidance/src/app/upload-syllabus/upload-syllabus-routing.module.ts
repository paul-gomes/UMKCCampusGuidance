import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadSyllabusPage } from './upload-syllabus.page';

const routes: Routes = [
  {
    path: '',
    component: UploadSyllabusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadSyllabusPageRoutingModule {}

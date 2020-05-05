import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router, private storageService: StorageService) {}

  uploadSchedule() {
    this.router.navigate(['/upload']);
  }

  addSyllabus() {
    this.router.navigate(['/upload-syllabus']);
  }

  signOut() {
    this.storageService.signOut();
    this.router.navigate(['/login']);
  }
}

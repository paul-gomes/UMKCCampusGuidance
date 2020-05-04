import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-schedule',
  templateUrl: './upload-schedule.page.html',
  styleUrls: ['./upload-schedule.page.scss'],
})
export class UploadSchedulePage implements OnInit {
  // text: OCRResult;
  message = '';
  selectedImage;
  imageData;

  constructor(private camera: Camera,
              private actionSheetController: ActionSheetController,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {}

  selectSource() {
    this.actionSheetController.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(ac => ac.present());
  }

  pickImage(source) {
    const options: CameraOptions = {
      quality: 100, sourceType: source,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };
    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      this.message = err.toString();
    });
  }

  useImage() {
    // this.ocr.recText(OCRSourceType.NORMFILEURL, this.imageData).then((result: OCRResult) => {
    //   this.text = result;
    // }).catch((error) => {
    //   console.log(error);
    // });

    // DEBUG
    // this.storageService.loadUser('test', () => {
    //   if (this.storageService.getCourseList().length === 0) {
    //     // tslint:disable-next-line:max-line-length
    //     const scheduleText = 'COMP-SCI 5540-0001 LEC (14110) \nCOMP-SCI 5551-0001 LEC (11505) \nCOMP-SCI 5552A-0001 LEC (13498) \nCOMP-SCI 5592-0001 LEC (14041) \nTuTh 1:00PM - 2:15PM Royall Hall-Rm 00111 TuTh 5:30PM - 6:45PM Flarsheim Hall-Rm 00460 MoWeFr 3:00PM - 3:50PM Haag Hall-Rm 00109 TuTh 10:00AM - 11:15AM Bloch -Rm 00002 ';
    //
    //     this.storageService.addSchedule(scheduleText, () => {
    //       this.router.navigate(['/tab1']);
    //     });
    //   } else {
    //     this.router.navigate(['/tab1']);
    //   }
    // });

    if (this.storageService.getCourseList().length === 0) {
      // tslint:disable-next-line:max-line-length
      const scheduleText = 'COMP-SCI 5540-0001 LEC (14110) \nCOMP-SCI 5551-0001 LEC (11505) \nCOMP-SCI 5552A-0001 LEC (13498) \nCOMP-SCI 5592-0001 LEC (14041) \nTuTh 1:00PM - 2:15PM Royall Hall-Rm 00111 TuTh 5:30PM - 6:45PM Flarsheim Hall-Rm 00460 MoWeFr 3:00PM - 3:50PM Haag Hall-Rm 00109 TuTh 10:00AM - 11:15AM Bloch -Rm 00002 ';

      this.storageService.addSchedule(scheduleText, () => {
        this.router.navigate(['/tab1']);
      });
    } else {
      this.router.navigate(['/tab1']);
    }
  }
}

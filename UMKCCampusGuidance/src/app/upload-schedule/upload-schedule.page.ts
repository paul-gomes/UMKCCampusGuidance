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

    this.storageService.createUser('tanya');
    // this.storageService.addSyllabus(0);
    //
    // this.router.navigate(['/tab1']);
  }
}

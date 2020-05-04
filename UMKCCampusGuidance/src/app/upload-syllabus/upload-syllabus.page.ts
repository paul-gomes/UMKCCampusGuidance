import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-syllabus',
  templateUrl: './upload-syllabus.page.html',
  styleUrls: ['./upload-syllabus.page.scss'],
})
export class UploadSyllabusPage implements OnInit {
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

    const buttons = [];
    this.storageService.getCourseList().forEach((course, index) => {
      buttons.push({
        text: course.name,
        handler: () => {
          this.selectCourse(index);
        }
      });
    });

    buttons.push({
      text: 'Cancel',
      role: 'cancel'
    });

    this.actionSheetController.create({
      buttons
    }).then(ac => ac.present());
  }

  selectCourse(index) {
    if (this.storageService.getCourseList().length !== 0) {
      // this.storageService.addSyllabus(index);
    }
  }

  done() {
    this.router.navigate(['/tab3']);
  }
}

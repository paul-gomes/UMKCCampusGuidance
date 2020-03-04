import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-upload-schedule',
  templateUrl: './upload-schedule.page.html',
  styleUrls: ['./upload-schedule.page.scss'],
})
export class UploadSchedulePage implements OnInit {
  text = '';
  message = '';

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(private httpService: HttpService,
              private camera: Camera,
              private file: File) { }

  ngOnInit() { }

  takePicture() {
    this.pickImage(this.camera.PictureSourceType.CAMERA);
  }

  chooseImage() {
    this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  pickImage(source) {
    const options: CameraOptions = {
      quality: 100, sourceType: source,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.text = imageData;
      this.httpService.getText(imageData).subscribe((data) => {
        if (data['OCRText'] === 0) {
          this.text = '';
          this.message = data['OCRErrorMessage'];
          return;
        }
        this.message = '';
        this.text = data['OCRText'][0];
      });
    }, (err) => {
      this.message = err.toString();
    });
  }
}

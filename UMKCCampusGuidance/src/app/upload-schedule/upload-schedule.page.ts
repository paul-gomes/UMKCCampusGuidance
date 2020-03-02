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

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(private httpService: HttpService,
              private camera: Camera,
              private file: File) { }

  ngOnInit() { }

  getText(image) {
    this.httpService.getText(image).subscribe((data) => {
      if (data['OCRText'] === 0) {
        this.text = data['OCRErrorMessage'];
        return;
      }
      this.text = data['OCRText'][0];
    });
  }

  takePicture() {
    this.pickImage(this.camera.PictureSourceType.CAMERA);
  }

  chooseImage() {
    this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  pickImage(source) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: source,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;

      // ImageData = content://com.android.providers.media.documents/document/image%3A13

      this.getText(imageData);
      this.text = imageData;
    }, (err) => {
      // Handle error
    });
  }
}

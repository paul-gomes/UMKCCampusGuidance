import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const OCR_URL = 'http://www.ocrwebservice.com/restservices/processDocument?gettext=true';
const OCR_USERNAME = 'tatz8';
const OCR_LICENSE_CODE = '15A951E7-59B3-412C-94D5-0CF5A9021728';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient, private file: File) {}

  public getText(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': OCR_USERNAME + ':' + OCR_LICENSE_CODE
          'Content-Length': image.length.toString()
        })
      };

      return this.http.post(`${OCR_URL}`, formData, httpOptions);
    };
    reader.readAsArrayBuffer(file);
  }
}

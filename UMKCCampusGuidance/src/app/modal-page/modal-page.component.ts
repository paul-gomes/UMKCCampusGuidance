import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

import {
  DomSanitizer,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";

@Component({
  selector: "app-modal-page",
  templateUrl: "./modal-page.component.html",
  styleUrls: ["./modal-page.component.scss"],
})
export class ModalPageComponent implements OnInit {
  @Input() url: string;
  @Input() topic: string;
  trustedUrl: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    public modalController: ModalController,
    private inAppBrowser: InAppBrowser
  ) {}

  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.trustedUrl);
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  openWebpage() {
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create(this.url, "_self");
  }
}

import { Component, OnInit, Input } from "@angular/core";
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
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this.trustedUrl);
  }
}

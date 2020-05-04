import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { StorageService } from "../storage/storage.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  usrUMKCCampus;
  passUMKCCampus;
  group: FormGroup;
  constructor(
    private builder: FormBuilder,
    private routerUMKCCampus: Router,
    public UMKCAlertController: AlertController,
    private firebaseUMKCCampus: AngularFireAuth,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.group = this.builder.group({
      usrUMKCCampus: ["", Validators.required],
      passUMKCCampus: ["", Validators.required],
    });
  }

  async ResetEmailUMKCCampus() {
    const alert = await this.UMKCAlertController.create({
      header: "Reset Email",
      subHeader: "",
      inputs: [
        { name: "email", type: "text", placeholder: "Please enter your email" },
      ],
      buttons: [
        { text: "Cancel", role: "cancel", cssClass: "secondary" },
        {
          text: "Okay",
          handler: (data) => {
            this.firebaseUMKCCampus.auth.sendPasswordResetEmail(data.email);
          },
        },
      ],
    });
    await alert.present();
    //  this.firebase.auth.sendPasswordResetEmail(this.Username);
  }
  LogInUMKCCampus(e) {
    try {
      this.firebaseUMKCCampus.auth
        .signInWithEmailAndPassword(this.usrUMKCCampus, this.passUMKCCampus)
        .then(() => {
          this.routerUMKCCampus.navigate(["/tab1"]);

          this.storageService.loadUser(this.usrUMKCCampus, () => {
            if (this.storageService.getCourseList().length === 0) {
              this.routerUMKCCampus.navigate(["/upload"]);
            } else {
              this.routerUMKCCampus.navigate(["/tab1"]);
            }
          });

          // tslint:disable-next-line:no-shadowed-variable
        })
        .catch((e) => {
          alert(e);
        });
    } catch (e) {
      console.error(e);
    }
    // if (this.group.invalid) {
    //     alert('Please complete in all values');
    //     return;
    // }
  }
}

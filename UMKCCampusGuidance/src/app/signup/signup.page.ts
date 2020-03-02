import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  FnameUMKCCampus;
  LnameUMKCCampus;
  usrUMKCCampus;
  passUMKCCampus;
  CpassUMKCCampus;

  constructor(public UMKCAlertController: AlertController, private FirebaseDB: AngularFireDatabase,
              private  routerUMKCCampus: Router, private firebaseUMKCCampus: AngularFireAuth) {
  }



  signUpUMKCCampus() {
    try {
      this.firebaseUMKCCampus.auth.createUserWithEmailAndPassword(this.usrUMKCCampus, this.passUMKCCampus).then(() => {
        this.firebaseUMKCCampus.authState.subscribe(auth => {
          // @ts-ignore
          this.FirebaseDB.object(`Profile/${auth.uid}`).set({
            UMKCFirstName: this.FnameUMKCCampus,
            UMKCLastName: this.LnameUMKCCampus
          }).then();
        });
        alert('Registration Done!');
        this.routerUMKCCampus.navigate(['/login']);
      }).catch((e) => {
        alert(e);
      });
    } catch (e) {
      console.error(e);
    }
  }

  registerUMKCCampus() {
    if (this.passUMKCCampus === this.CpassUMKCCampus) {

      if ((this.FnameUMKCCampus != null) && (this.LnameUMKCCampus != null)
          && (this.usrUMKCCampus != null) && (this.passUMKCCampus != null)) {
        this.signUpUMKCCampus();
      } else {
        alert('Please complete the information');
      }

    } else {
      alert('The password you entered is not matched');
    }
  }
}

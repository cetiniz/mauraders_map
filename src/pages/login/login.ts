import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { UserServiceProvider } from "../../providers/user-service/user-service";

import { MapPage } from "../map/map";
import { SignUpPage } from "../signup/signup";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserServiceProvider]
})
export class LoginPage {

  private sessionID;

  private submitAttempt: boolean = false;

  email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[_a-z0-9-]+(.[a-z0-9-]+)@mcmaster\\.ca$")
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-zA-Z]\\w{3,14}$")
  ]);

  login: FormGroup = this.formBuilder.group({
    email: this.email,
    password: this.password
  });

  email_after_register: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public userService: UserServiceProvider)
  {
    this.email_after_register = navParams.get("email");
  }

  process_login() {
    this.submitAttempt = true;

    if (this.login.valid) {
      let email = this.login.value.email;
      let password = this.login.value.password;

      this.checkCredentials(email, password)
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Bad credentials',
      subTitle: 'The provided email and password does not match with our user database. Please register before using the app!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Register',
          handler: () => {
            this.navCtrl.push(SignUpPage);
          }
        }
      ]
    });
    alert.present();
  }

  checkCredentials(email: any, password: any) {
    return this.userService.getUsers()
      .subscribe(users => {
        for (let i = 0; i < users.length; i++) {
          if (email === users[i].email && password === users[i].password) {
            this.navCtrl.push(MapPage, { 'sessionId': users[i]._id });
            return;
          }
        }
        this.presentAlert();
        return;
      });
  }

  goSignUp() {
    this.navCtrl.push(SignUpPage);
  }
}

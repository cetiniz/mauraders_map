import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { UserServiceProvider } from "../../providers/user-service/user-service";

import { LoginPage } from "../login/login";
import { matchPasswordsValidator } from "../../validators/matchPasswordsValidator";
//import { User } from "../../models/user";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UserServiceProvider]
})
export class SignUpPage {

  private submitAttempt: boolean = false;

  email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[_a-z0-9-]+(.[a-z0-9-]+)@mcmaster\\.ca$")
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-zA-Z]\\w{3,14}$")
  ]);

  conf_password = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-zA-Z]\\w{3,14}$"),
    matchPasswordsValidator('password')
  ]);

  signup: FormGroup = this.formBuilder.group({
    email: this.email,
    password: this.password,
    conf_password: this.conf_password
  });

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public userService: UserServiceProvider) { }

  process_signup() {
    this.submitAttempt = true;

    if (this.signup.valid) {
      let email = this.signup.value.email;
      let password = this.signup.value.password;

      this.checkCredentials(email, password)
    }
  }

  presentAlert(email:any) {
    let alert = this.alertCtrl.create({
      title: 'Bad credentials',
      subTitle: 'This McMaster email is already used. Please login to access the app!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Login',
          handler: () => {
            this.navCtrl.push(LoginPage, { email: email });
          }
        }
      ]
    });
    alert.present();
  }

  checkCredentials(email: any, password: any) {
    this.userService.getUsers()
      .subscribe(users => {
        for (let i = 0; i < users.length; i++) {
          if (email === users[i].email) {
            this.presentAlert(email);
            return;
          }
        }

        let user = {
          email: email,
          password: password
        };
        this.userService.createUser(user);
        this.navCtrl.push(LoginPage, { email: email });
        return;
      });
  }

  goLogin() {
    this.navCtrl.popTo(LoginPage);
  }
}

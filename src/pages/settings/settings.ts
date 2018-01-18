import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { UserServiceProvider } from "../../providers/user-service/user-service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  private sessionID;

  accessValue: boolean;

  accessibility: string;
  distanceUnit: string;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;

  constructor(public navCtrl: NavController,
              public userService: UserServiceProvider,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController) {
    this.sessionID = navParams.get("sessionId");

    this.retrieveSettings();
  }

  retrieveSettings() {
    this.userService.getUser(this.sessionID)
      .subscribe(user => {
        this.accessibility = user.accessibility;
        this.distanceUnit = user.distanceUnit;
        this.avatar = user.avatar;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
      })
  }

  showPopover(ev: any) {
    let popover = this.popoverCtrl.create(HelpPage);

    popover.present({
      ev: ev
    });
  }

  updateAccessibility() {
    this.accessibility = this.accessValue ? 'true' : 'false';

    this.userService.getUser(this.sessionID)
      .subscribe(user => {
        this.userService.updateUser(this.sessionID, {
          rev: user._rev,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          firstname: user.firstname,
          lastname: user.lastname,
          distanceUnit: user.distanceUnit,
          accessibility: this.accessValue ? 'true' : 'false',
          posLat: user.posLat,
          posLng: user.posLng
        });
      });
  }

  updateDistanceUnit() {
    this.userService.getUser(this.sessionID)
      .subscribe(user => {
        this.userService.updateUser(this.sessionID, {
          rev: user._rev,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          firstname: user.firstname,
          lastname: user.lastname,
          distanceUnit: this.distanceUnit,
          accessibility: user.accessibility,
          posLat: user.posLat,
          posLng: user.posLng
        });
      });
  }

  clickNames() {
    let prompt = this.alertCtrl.create({
      title: 'Change firstname/lastname',
      message: "Enter your firstname and your lastname:",
      inputs: [
        {
          name: 'firstname',
          placeholder: 'Firstname'
        },
        {
          name: 'lastname',
          placeholder: 'Lastname'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'Proceed',
          handler: data => {
            if (data.firstname !== '' && data.lastname !== '') {
              this.userService.getUser(this.sessionID)
                .subscribe(user => {
                  this.userService.updateUser(this.sessionID, {
                    rev: user._rev,
                    email: user.email,
                    password: user.password,
                    avatar: user.avatar,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    distanceUnit: user.distanceUnit,
                    accessibility: user.accessibility,
                    posLat: user.posLat,
                    posLng: user.posLng
                  });
                  this.retrieveSettings();
                });
            }
          }
        }
      ]
    });
    prompt.present();
  }

  clickPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Change password',
      message: "Enter your current password:",
      inputs: [
        {
          name: 'currentPassword',
          type: 'password',
          placeholder: 'Password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'Continue',
          handler: data => {
            this.changePassword(data.currentPassword);
          }
        }
      ]
    });
    prompt.present();
  }

  changePassword(currentPassword) {
    this.userService.getUser(this.sessionID)
      .subscribe(user => {
        if (user.password === currentPassword) {
          let prompt = this.alertCtrl.create({
            title: 'Change password',
            message: "Enter a new password:",
            inputs: [
              {
                name: 'newPassword',
                type: 'password',
                placeholder: 'Password'
              },
              {
                name: 'confirmPassword',
                type: 'password',
                placeholder: 'Confirm password'
              }
            ],
            buttons: [
              {
                text: 'Cancel',
                handler: data => {}
              },
              {
                text: 'Proceed',
                handler: data => {
                  if (data.newPassword === data.confirmPassword) {
                    this.userService.updateUser(this.sessionID, {
                      rev: user._rev,
                      email: user.email,
                      password: data.newPassword,
                      avatar: user.avatar,
                      firstname: user.firstname,
                      lastname: user.lastname,
                      distanceUnit: user.distanceUnit,
                      accessibility: user.accessibility,
                      posLat: user.posLat,
                      posLng: user.posLng
                    });
                  } else {
                    let error = this.alertCtrl.create({
                      title: 'Unmatching passwords',
                      message: 'The confirmation password must be equal to the new password.',
                      buttons: [
                        {
                          text: 'Ok',
                          handler: data => {}
                        }
                      ]
                    });
                    error.present();
                  }
                }
              }
            ]
          });
          prompt.present();
        } else {
          let errorpass = this.alertCtrl.create({
            title: 'Wrong passord',
            message: 'You entered a wrong password.',
            buttons: [
              {
                text: 'Ok',
                handler: data => {}
              }
            ]
          });
          errorpass.present();
        }
      });
  }

  changePicture() {
    console.log("change picture");
  }

}



@Component({
  template: `
    <p padding>Turn on to show the buildings' accessibility entrances.</p>
  `
})
export class HelpPage {

  constructor(private navParams: NavParams) {}
}

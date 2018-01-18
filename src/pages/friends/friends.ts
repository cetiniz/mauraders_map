import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Relationship } from "../../models/relationship";
import { User } from "../../models/user";
import { RelationshipServiceProvider } from "../../providers/relationship-service/relationship-service";
import { UserServiceProvider } from "../../providers/user-service/user-service";

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  private sessionID;

  private numberNotifications: any;
  friends: any[] = [];


  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public relationshipService: RelationshipServiceProvider,
              public userService: UserServiceProvider,
              public navParams: NavParams) {
    this.sessionID = navParams.get("sessionId");
    this.numberNotifications = 0;

    this.retrieveRelationships();
  }

  retrieveRelationships() {
    this.friends = [];
    this.relationshipService.getRelationships()
      .subscribe(relationships => {
        for (let i = 0; i < relationships.length; i++) {
          if (relationships[i].userA === this.sessionID) {
            this.userService.getUser(relationships[i].userB)
              .subscribe(friend => {
                let rel = {
                  id_rel:relationships[i]._id,
                  id_friend: relationships[i].userB,
                  avatar: friend.avatar,
                  email: friend.email,
                  firstname: friend.firstname,
                  lastname: friend.lastname,
                  status: relationships[i].status
                };
                if (rel.status === 'received') { this.numberNotifications++; }
                this.friends.push(rel);
              });
          }
        }
      });
  }

  onInput(ev: any) {
    // Set val to the value of the searchbar
    let val = ev.target.value;

    this.friends = [];
    this.relationshipService.getRelationships()
      .subscribe(relationships => {
        for (let i = 0; i < relationships.length; i++) {
          if (relationships[i].userA === this.sessionID) {
            this.userService.getUser(relationships[i].userB)
              .subscribe(friend => {
                if (friend.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    friend.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    friend.email.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                  let rel = {
                    id_rel:relationships[i]._id,
                    id_friend: relationships[i].userB,
                    avatar: friend.avatar,
                    email: friend.email,
                    firstname: friend.firstname,
                    lastname: friend.lastname,
                    status: relationships[i].status
                  };
                  this.friends.push(rel);
                }
              });
          }
        }
      });
  }

  doRefresh(refresher: any) {
    this.retrieveRelationships();
    refresher.complete();
  }

  deleteFriend(friend: any) {
    console.log(friend);
    this.relationshipService.getRelationships()
      .subscribe(async relationships => {
        for (let i = 0; i < relationships.length; i++) {
          if (relationships[i].userA === this.sessionID && relationships[i].userB === friend.id_friend) {
            await this.relationshipService.updateRelationship(relationships[i]._id, {rev: relationships[i]._rev});
            if (friend.status === 'received') { this.numberNotifications--; }
          } else if (relationships[i].userB === this.sessionID && relationships[i].userA === friend.id_friend) {
            await this.relationshipService.updateRelationship(relationships[i]._id, {rev: relationships[i]._rev});
          }
        }
      });
  }

  acceptFriendRequest(friend: any) {
    this.relationshipService.getRelationships()
      .subscribe(relationships => {
        for (let i = 0; i < relationships.length; i++) {
          if (relationships[i].userA === this.sessionID && relationships[i].userB === friend.id_friend && relationships[i].status === 'received') {
            this.relationshipService.updateRelationship(relationships[i]._id, {
              rev: relationships[i]._rev,
              userA: this.sessionID,
              userB: friend.id_friend,
              status: 'accepted'
            });
          } else if (relationships[i].userB === this.sessionID && relationships[i].userA === friend.id_friend && relationships[i].status === 'pending') {
            this.relationshipService.updateRelationship(relationships[i]._id, {
              rev: relationships[i]._rev,
              userA: friend.id_friend,
              userB: this.sessionID,
              status: 'accepted'
            });
          }
        }
      });
    this.numberNotifications--;
  }

  promptAddFriend() {
    let prompt = this.alertCtrl.create({
      title: 'Add a new friend',
      message: "Enter your friend's email to send him/her a request.",
      inputs: [
        {
          name: 'friendEmail',
          placeholder: 'McMaster email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.addFriend(data.friendEmail);
          }
        }
      ]
    });
    prompt.present();
  }
  promptConfirmSent() {
    let prompt = this.alertCtrl.create({
      title: 'Request Sent Successfully!',
      message: 'Friend request should appear in list of added friends.',
      buttons: [
        {
          text: 'Great!'

        }
      ]
    });
    prompt.present();
  }

  addFriend(email: any) {
    // Check if the person is registered and if no relationship exist between them
    this.userService.getUsers()
      .subscribe(users => {
        for (let i = 0; i < users.length; i++) {
          if (email === users[i].email) {
            // Email registered ==> check for some existing relationships
            for (let i = 0; i < this.friends.length; i++) {
              if (this.friends[i].email === email) {
                // ERROR relationship exist
                console.log("ERROR relationship exists");
                this.alertRelationshipExists(email);
                return;
              }
            }

            // OK
            // Create a A -> B pending AND a B -> A received
            let pending = {
              userA: this.sessionID,
              userB: users[i]._id,
              status: 'pending'
            };
            let received = {
              userA: users[i]._id,
              userB: this.sessionID,
              status: 'received'
            };
            this.relationshipService.createRelationship(pending);
            this.relationshipService.createRelationship(received);
            this.retrieveRelationships();
            this.promptConfirmSent();
            return;
          }
        }
        // ERROR if no match ==> person not registered
        this.alertNoMatch(email);
        return;
      });
  }

  alertRelationshipExists(email) {
    let alert = this.alertCtrl.create({
      title: 'Already connected!',
      subTitle: 'You and '+email+' are already connected... don\'t push it!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }

  alertNoMatch(email) {
    let alert = this.alertCtrl.create({
      title: 'No match',
      subTitle: email+' is not yet registered :(',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    alert.present();
  }
}

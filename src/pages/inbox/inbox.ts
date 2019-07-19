import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Email } from '../../models';
import { UserProvider, EmailProvider } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  emails$: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UserProvider, private emailProvider: EmailProvider) {
  }

  ionViewWillLoad() {
    if (!this.user._user) {
      this.navCtrl.setRoot('WelcomePage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
    this.emails$ = this.emailProvider.getEmails();
    this.emails$.subscribe(emails => {
      console.log('emails', emails);
    });
  }

}

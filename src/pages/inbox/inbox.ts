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
  emails$: Observable<Email[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private user: UserProvider, private emailProvider: EmailProvider) {
  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad InboxPage');
    this.emails$ = this.emailProvider.getEmails();
    this.emails$.subscribe(emails => {
      console.log('emails', emails);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

}

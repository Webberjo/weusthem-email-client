import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Email } from '../../models';
import { ApiProvider, UserProvider } from '../../providers';


@Injectable()
export class EmailProvider {

  constructor(public api: ApiProvider, private user: UserProvider) {
    console.log('Hello EmailProvider Provider');
  }

  getEmails(): Observable<any> {
    let params = {
      'pageName': 'inbox',
      'pageNumber': 0,
      'pageSize': 25,
      'user': this.user._user
    }
    return this.api.get('email', params);
  }

  sendEmail(email: Email) {

  }

}

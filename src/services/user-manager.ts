import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UserManagerProvider {
  user: User;

  constructor(private db: AngularFireDatabase) {
  }

  setUser(user: User) {
    this.user = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    this.updateUser(this.user);
  }

  updateUser(user) {
    this.db.list('/users').update(this.user.uid, user);
  }

  getGroups() {
    return this.db.list(`/users/${this.user.uid}/groups/`)
      .map((groups) => groups.map(group => group.$key));
  }

  getUsersByName(searchTerm: string) {
    // TODO: fix this query.
    /*return this.db.list('/users/', {query: {orderByChild: 'displayName', equalTo: searchTerm}})*/
    return this.db.list('/users/')
      .map(users => users
        .filter(user => user.displayName.toLowerCase().includes(searchTerm.toLowerCase())));
  }
}

export interface User {
  uid: string
  displayName: string
  photoURL: string
}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

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

  updateUser(user){
    this.db.list('/users').update(this.user.uid, user);
  }

  getGroups() {
    return this.db.list(`/users/${this.user.uid}/groups/`);
  }
}

export interface User {
  uid: string
  displayName: string
  photoURL: string
}

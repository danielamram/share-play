import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { IGroup } from '../models/group.model';
import { UserManagerProvider } from './user-manager';
import {Observable} from "rxjs/Observable";

@Injectable()
export class GroupsManagerService {
  private groups: FirebaseListObservable<IGroup[]>;

  constructor(private db: AngularFireDatabase,
              private userManagerProvider:UserManagerProvider) {
  }

  createNewGroup(group: IGroup) {
    let members = group.members;
    group.members = [];
    let newGroup = this.db.list('/groups/').push(group);
    members.forEach((member) => {
      this.addUserToGroup(member, newGroup.key);
    })
  }

  addUserToGroup(user, groupKey:string) {
    this.db.list(`/groups/${groupKey}/members`).push(user);
    this.db.list(`/users/${user.uid}/groups`).push(groupKey);
  }

  getGroups() {
    return this.userManagerProvider.getGroups()
      .map((groups) => groups
        .map(group => this.db.object(`/groups/${group.$value}`)
          .do((group) => group.members = Object.values(group.members))
          .do((group) => group.playlist = group.playlist ? Object.values(group.playlist) : [])));
  }
}

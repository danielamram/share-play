import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {UserManagerProvider} from './user-manager';

@Injectable()
export class GroupsManagerService {

  constructor(private db: AngularFireDatabase,
              private userManagerProvider: UserManagerProvider) {
  }

  getGroups() {
    return this.userManagerProvider.getGroups()
      .map((groups) => groups
        .map(groupKey => this.db.object(`/groups/${groupKey}`)
          .do((group) => group.members = Object.values(group.members))
          .do((group) => group.playlist = group.playlist ? Object.values(group.playlist) : [])));
  }

  async upsertGroup(group) {
    let groupKey:string;
    if (group.$key) {
      await this.db.list('/groups/').update(group.$key, group);
      groupKey = group.$key
    }
    else {
      groupKey = this.db.list('/groups/').push(group).key
    }

    return Promise.all(this.assignGroupToUsers(group.members, groupKey));
  }

  private assignGroupToUsers(members:any[], groupKey:string) {
    return members.map(member => this.db.list(`/users/${member.uid}/groups`).set(groupKey, true));
  }
}

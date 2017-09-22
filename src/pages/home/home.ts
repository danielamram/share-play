import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditGroupPage } from '../edit-group/edit-group';
import { IGroup } from '../../models/group.model';
import { GroupsManagerService } from '../../services/groups-manager.service';
import { Observable } from 'rxjs/Observable';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  groups: Observable<IGroup[]>;
  editGroupPage: any;

  constructor(private navCtrl: NavController,
              private groupsManagerService:GroupsManagerService) {
    this.editGroupPage = EditGroupPage;
    this.groups = this.groupsManagerService.getGroups();
  }

  navToPlaylist(group:any) {
    this.navCtrl.push(AboutPage, {groupKey: group.$key});
  }

  editGroup(group:any){
    this.navCtrl.push(EditGroupPage, {group: group});
  }
}

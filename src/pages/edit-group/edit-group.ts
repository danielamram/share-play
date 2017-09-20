import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { GroupsManagerService } from '../../services/groups-manager.service';
import {UserManagerProvider} from "../../services/user-manager";

/**
 * Generated class for the editGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-group',
  templateUrl: 'edit-group.html',
})
export class EditGroupPage {
  group = {
    name: '',
    members: [],
    photoURL: 'assets/group-avatars/group',
    playlist: []
  };

  constructor(public navCtrl: NavController,
              private userManagerProvider:UserManagerProvider,
              private groupsManagerService:GroupsManagerService,
              private toastCtrl: ToastController) {
    let randomNum = Math.floor((Math.random() * 4) + 1) + '';
    this.group.photoURL += randomNum +='.png';
    this.group.members.push(this.userManagerProvider.user);
  }

  addUserToGroup(){
    console.log('hi');
  }

  createGroup() {
    this.groupsManagerService.createNewGroup(this.group);
    this.toastCtrl.create({
      message: 'Group created successfully',
      duration: 1500,
      position: 'bottom'
    }).present();
    this.navCtrl.pop();
  }
}

import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {GroupsManagerService} from '../../services/groups-manager.service';
import {UserManagerProvider} from "../../services/user-manager";
import {SearchUsersPage} from "../search-users/search-users";
import {mergeMap} from "rxjs/operator/mergeMap";

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
  group: any;

  constructor(private navCtrl: NavController,
              private params: NavParams,
              private userManagerProvider: UserManagerProvider,
              private groupsManagerService: GroupsManagerService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) {
    this.group = this.params.get('group') ? this.params.get('group') : this.initGroup();
  }

  addUserToGroup() {
    let searchPage = this.modalCtrl.create(SearchUsersPage);
    searchPage.onDidDismiss(user => {
      if (user) {
        let existMember = this.group.members.find(member => member.uid === user.uid);
        this.group.members = existMember ? this.group.members.filter(member => member.uid !== user.uid) : [...this.group.members, user];
      }
    });
    searchPage.present();
  }

  async saveGroup() {
    await this.groupsManagerService.upsertGroup(this.group);
    this.showToast();
    this.navCtrl.pop();
  }

  private initGroup() {
    let randomNum = Math.floor((Math.random() * 4) + 1) + '';
    return {
      name: '',
      members: [this.userManagerProvider.user],
      photoURL: `assets/group-avatars/group${randomNum}.png`,
      playlist: []
    };
  }

  private showToast() {
    this.toastCtrl.create({
      message: 'Group saved successfully',
      duration: 1500,
      position: 'bottom'
    }).present();
  }
}

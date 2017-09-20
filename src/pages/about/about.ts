import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { Video } from '../../models/video.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { SearchVideosPage } from '../search-videos/search-videos';
import plyr from 'plyr';
import "rxjs/add/operator/take";
import { VideoManagerService } from '../../services/videos-manager.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {
  activeVideo: string;
  videoList: FirebaseListObservable<Video[]>;
  videoIndex: number;
  loading:boolean;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              private videoManagerService: VideoManagerService) {
    this.videoIndex = 0;
    this.loading = true;
  }

  ngOnInit(): void {
    let player = plyr.setup()[0];
    this.videoList = this.videoManagerService.getPlaylist(this.navParams.get('groupKey'));
    this.videoList
      .take(1)
      .subscribe((videos: Video[]) => {
        this.loading = false;
        if (videos.length) {
          this.activeVideo = videos[this.videoIndex].id;
          player.source({
            type:       'video',
            title:      'Example title',
            sources: [{
              src:    this.activeVideo,
              type:   'youtube'
            }]
          });
        }
      });
  }

  openSearchPage() {
    let searchPage = this.modalCtrl.create(SearchVideosPage,
      {groupKey: this.navParams.get('groupKey')},
      {showBackdrop: true});
    searchPage.present();
  }
}

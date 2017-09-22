import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { Video } from '../../models/video.model';
import { SearchVideosPage } from '../search-videos/search-videos';
import plyr from 'plyr';
import "rxjs/add/operator/take";
import { VideoManagerService } from '../../services/videos-manager.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {
  playlist: Video[];
  videoIndex: number;
  player:any;
  loading:boolean;

  constructor(private params: NavParams,
              private modalCtrl: ModalController,
              private videoManagerService: VideoManagerService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.videoManagerService.getPlaylist(this.params.get('groupKey'))
      .subscribe(playlist => this.playlist = playlist);
  }

  play() {
    if (this.playlist.length) {
      this.player = plyr.setup()[0];
      this.videoIndex = -1;
      this.nextVideo();
      this.player.on('ended', this.nextVideo.bind(this));
    }
  }

  likeVideo(video:any) {
    console.log('like Video');
  }

  removeVideo(video:any) {
    this.videoManagerService.removeVideoFromPlaylist(this.params.get('groupKey'), video.$key);
  }

  openSearchPage() {
    let searchPage = this.modalCtrl.create(SearchVideosPage,
      {groupKey: this.params.get('groupKey')});
    searchPage.present();
  }

  private nextVideo(){
    this.videoIndex = (this.videoIndex + 1) % this.playlist.length;
    this.player.source({
      type: 'video',
      clickToPlay: true,
      autoplay: true,
      sources: [{
        src:    this.playlist[this.videoIndex].id,
        type:   'youtube'
      }]
    });
  }
}

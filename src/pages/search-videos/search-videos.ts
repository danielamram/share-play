import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Video } from '../../models/video.model';
import { VideoManagerService } from '../../services/videos-manager.service';
import { YoutubeManagerService } from '../../services/youtube-manager.service';
import 'rxjs/add/operator/debounceTime';
import * as Rx from 'rxjs';

@Component({
  selector: 'page-search-videos',
  templateUrl: 'search-videos.html',
})
export class SearchVideosPage {
  videosItems: Observable<Video[]>;

  constructor(private params: NavParams,
              private videoManagerService: VideoManagerService,
              private youtubeManagerService: YoutubeManagerService) {
  }

  addVideo(video:any) {
    this.videoManagerService.addVideoToPlaylist(this.params.get('groupKey'), video);
  }

  removeVideo(video:any) {
    this.videoManagerService.removeVideoFromPlaylist(this.params.get('groupKey'), video.$key);
  }

  searchVideos(searchTerm:string) {
    this.videosItems = searchTerm ? Rx.Observable.combineLatest(
      this.youtubeManagerService.fetchVideos(searchTerm),
      this.videoManagerService.getPlaylist(this.params.get('groupKey')), (queryVideos, playlist) => {
      return queryVideos.map((video) => {
        let videoExist = playlist.find((playlistVideo) => playlistVideo.id === video.id);
        return videoExist ? videoExist : video;
      })
    }) : Observable.from([]);
  }
}

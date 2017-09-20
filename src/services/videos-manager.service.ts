import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { Video } from '../models/video.model';

@Injectable()
export class VideoManagerService {
  constructor(private db: AngularFireDatabase) {
  }

  addVideoToPlaylist(groupKey: string, video: Video): void {
    this.db.list(`/groups/${groupKey}/playlist/`).push(video);
  }

  removeVideoFromPlaylist(groupKey: string, videoKey: string): void {
    this.db.list(`/groups/${groupKey}/playlist/`).remove(videoKey);
  }

  getPlaylist(groupKey: string): FirebaseListObservable<Video[]> {
    return this.db.list(`/groups/${groupKey}/playlist/`);
  }
}

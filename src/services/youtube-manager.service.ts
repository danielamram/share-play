import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Video } from '../models/video.model';

@Injectable()
export class YoutubeManagerService {
  constructor(private http: Http) {
  }

  fetchVideos(query:string) {
    return this.http
      .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}` +
        '&maxResults=20' +
        '&type=video' +
        '&key=AIzaSyAARhzDEdAwaIYKelgTmVa8Nez5sLKjBcM')
      .map(response => response.json())
      .map((data) => {
        return data.items.map(video => new Video(video))
      });
  }
}

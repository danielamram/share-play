export class Video implements IVideo {
  id:string;
  title:string;
  thumbnailUrl:string;
  channelTitle:string;

  constructor(video:any) {
    this.id = video.id.videoId;
    this.title = video.snippet.title;
    this.thumbnailUrl = video.snippet.thumbnails.high.url;
    this.channelTitle = video.snippet.channelTitle;

  };
}


export interface IVideo {
  id:string
  title:string
  thumbnailUrl:string
  channelTitle:string
}

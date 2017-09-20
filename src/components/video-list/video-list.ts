import { Component } from '@angular/core';

/**
 * Generated class for the VideoListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'video-list',
  templateUrl: 'video-list.html'
})
export class VideoListComponent {

  text: string;

  constructor() {
    console.log('Hello VideoListComponent Component');
    this.text = 'Hello World';
  }

}

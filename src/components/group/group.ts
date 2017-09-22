import {Component, EventEmitter, Input, Output} from '@angular/core';

/**
 * Generated class for the GroupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'group',
  templateUrl: 'group.html'
})
export class GroupComponent {
  @Input() groupElement:any;
  @Output() groupClicked:EventEmitter<any>;
  @Output() groupPressed:EventEmitter<any>;

  constructor() {
    this.groupClicked = new EventEmitter<any>();
    this.groupPressed = new EventEmitter<any>();
  }

  click() {
    this.groupClicked.emit(this.groupElement);
  }

  editGroup() {
    this.groupPressed.emit(this.groupElement);
  }
}

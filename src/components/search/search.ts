import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent implements OnInit {
  @Input() items:any[];
  @Input() imageProperty:string;
  @Input() headerProperty:string;
  @Input() subHeaderProperty:string;
  @Output() addItem:EventEmitter<any>;
  @Output() removeItem:EventEmitter<any>;
  @Output() search:EventEmitter<string>;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: boolean;

  constructor() {
    this.searchControl = new FormControl();
    this.addItem = new EventEmitter<any>();
    this.removeItem = new EventEmitter<any>();
    this.search = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.search.emit(search);
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  toggleItem(item:any) {
    if (item.$key) {
      this.removeItem.emit(item);
    }
    else {
      this.addItem.emit(item);
    }
  }
}

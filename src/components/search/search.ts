import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() items: any[];
  @Input() imageProperty: string;
  @Input() headerProperty: string;
  @Input() subHeaderProperty: string;
  @Input() existProperty: string;
  @Output() addItem: EventEmitter<any>;
  @Output() removeItem: EventEmitter<any>;
  @Output() search: EventEmitter<string>;
  subscription:Subscription;
  searchControl: FormControl;
  searching: boolean;

  constructor() {
    this.searchControl = new FormControl();
    this.addItem = new EventEmitter<any>();
    this.removeItem = new EventEmitter<any>();
    this.search = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.subscription = this.searchControl.valueChanges
      .debounceTime(700)
      .subscribe(searchTerm => {
        this.searching = false;
        this.search.emit(searchTerm);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSearchInput() {
    this.searching = true;
  }

  toggleItem(item: any) {
    if (item[this.existProperty]) {
      this.removeItem.emit(item);
    }
    else {
      this.addItem.emit(item);
    }
  }
}

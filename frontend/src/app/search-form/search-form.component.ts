import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() submit: EventEmitter<string> = new EventEmitter();
  @Input()
  public query: string = "";

  constructor() { }

  ngOnInit() {
  }

  queryChanged() {
    this.submit.emit(this.query);
  }


}

import {Component, EventEmitter, Output} from '@angular/core';

export interface IAdvancedQuery {
  person: string;
  ort: string;
  datum: Date;
}

@Component({
  selector: 'app-advanced-search-form',
  templateUrl: './advanced-search-form.component.html',
  styleUrls: ['./advanced-search-form.component.scss']
})
export class AdvancedSearchFormComponent {
  @Output()
  public submit = new EventEmitter();

  public query: IAdvancedQuery = {
    person: undefined,
    ort: undefined,
    datum: undefined
  };


  public contentChanged(event?) {
    if(event && event.key !== "Enter") return;
    this.submit.emit(this.query);
  }
}

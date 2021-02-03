import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs/index";
import {debounceTime} from "rxjs/internal/operators/debounceTime";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {SolrService} from "../solr.service";
import {switchMap} from "rxjs/internal/operators/switchMap";
import {environment} from "../../environments/environment";
import {EvaluationService, IQuery} from "../evaluation.service";
import {MatDialog} from "@angular/material";
import {SpeechDialogComponent} from "../speech-dialog/speech-dialog.component";
import {SearchFormComponent} from "../search-form/search-form.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  animations: [
    trigger('centering', [
      state('center', style({
        margin: "30vh 30vw 30vh 20vw",
        minWidth: "25rem",
      })),
      state('top', style({
        margin: "1.5rem",
      })),
      transition('center => top', [
        animate('0.2s')
      ]),
      transition('top => center', [
        animate('0.5s')
      ]),
    ]),
  ],
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @ViewChild(SearchFormComponent)
  public searchForm;
  public advancedSearch = false;
  public response = {
    numFound: undefined,
    docs: [],
  };
  public highlighting;

  public actualQuery: IQuery = {
    id: 0,
    term: "",
  };
  private searchTerms = new Subject<string>();

  constructor(private solrService: SolrService,
              private evalService: EvaluationService,
              public dialog: MatDialog) {
  }

  search(term: string): void {
    console.log(term);
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      // distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        if (this.evaluationMode) this.actualQuery.term = term;
        return this.solrService.getResults(term);
      })
    ).subscribe((resp) => {
      this.highlighting = resp.highlighting;
      this.response = resp.response;
      this.response.docs =
        this.response.docs.map(
          (res) => Object.assign(res, {
            feedback:
              {
                relevant: false
              }
          }));
    });

    if (this.evaluationMode) {
      this.evalService.fetchQueries().subscribe((queries: IQuery) => {
        this.actualQuery = queries[0];
        this.searchTerms.next(this.actualQuery.term);
      });
    }
  }

  public openSpeech(url: string) {
    window.open(url, "_blank");
  }

  public openSpeechDialog(speech: any): void {
    if (!speech.rohtext) {
      this.openSpeech(speech.url);
      return;
    }
    const dialogRef = this.dialog.open(SpeechDialogComponent, {
      width: '80%',
      data: speech
    });
  }

  public get evaluationMode() {
    return environment.evaluation;
  }

  public next() {
    const nextQuery = this.evalService.sendFeedbackAndGetNextQuery({
      query_id: this.actualQuery.id,
      results: this.response.docs,
    });
    if (nextQuery) {
      this.searchTerms.next(nextQuery.term);
      this.actualQuery = nextQuery;
    } else {
      this.searchTerms.next("FEEEEEEEEEEEERTIG!!!");
    }
  }

  public loadQuery(id: number) {
    const nextQuery = this.evalService.loadQuery(id);
    if (nextQuery) {
      this.searchTerms.next(nextQuery.term);
      this.actualQuery = nextQuery;
    } else {
      this.searchTerms.next("FEEEEEEEEEEEERTIG!!!");
    }
  }

  public getSnippetForId(id: string) {
    if (this.highlighting[id].rohtext) {
      return `...${this.highlighting[id].rohtext[0]}...`;
    } else {
      return "";
    }
  }
}

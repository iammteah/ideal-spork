import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {WINDOW} from "./window.provider";

export interface IFeedback {
  query_id: number;
  results: any[];
}

export interface IQuery {
  id: number;
  term: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private get httpBase(){ return `http://${this.hostname}:3000`;}
  private evalQueries: IQuery[] = [];

  constructor(private http: HttpClient,
              @Inject(WINDOW) private window: Window) {
  }

  fetchQueries(): Observable<any> {
    return this.http.get<IQuery[]>(this.getUrl(`/queries`))
      .pipe(
        tap(queries => {
          this.evalQueries = queries.sort(q => q.id);
          this.log('fetched queries');
        }),
        map((x) => x || []),
        catchError(this.handleError('getQueries', []))
      )
      ;
  }

  putFeedback(feedback: IFeedback): Observable<any> {
    console.log(feedback);
    feedback.results = feedback.results.map(r => {
      r.einleitung = "removed";
      r.rohtext = "removed";
      r.schluss = "removed";
      r.anrede = "removed";
      return r;
    })
    return this.http.put<any>(this.getUrl(`/feedback`), feedback)
      .pipe(
        tap(_ => this.log('put feedback')),
        catchError(this.handleError('putFeedback', []))
      );
  }

  sendFeedbackAndGetNextQuery(feedback: IFeedback): IQuery {
    const lastQueryId = feedback.query_id;
    this.putFeedback(feedback).subscribe();
    return this.loadQuery(lastQueryId + 1);
  }

  loadQuery(id: number) {
    return this.evalQueries.find(q => q.id >= id);
  }

  private get hostname() : string {
      return this.window.location.hostname;
  }

  private getUrl(res) {
    return `${this.httpBase}${res}`;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`EvalService: ${message}`);
  }
}

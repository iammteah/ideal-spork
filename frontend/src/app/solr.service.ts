import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from "rxjs/index";
import {tap} from "rxjs/internal/operators/tap";
import {catchError} from "rxjs/internal/operators/catchError";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {WINDOW} from "./window.provider";

@Injectable({
  providedIn: 'root'
})
export class SolrService {
  private get httpBase(){ return `http://${this.hostname}:8983/solr/Rede`;}

  constructor(private http: HttpClient,
              @Inject(WINDOW) private window: Window) {
    moment.locale("de");
  }

  getResults(term: any): Observable<any> {
    console.log({term});
    let urlParams: string;
    if (typeof term === "string") {
      urlParams = `q=${term}`;
    } else {
      let queryChain = "";
      for (const key in term) {
        if (term[key]) {
          if (queryChain) queryChain += " AND ";
          if (key === "datum") {
            queryChain += `(datum:"${moment(term[key]).format("l")}" `
              + `OR datum:"${moment(term[key]).format("L")}" `
              + `OR datum:"${moment(term[key]).format("LL")}")`;
          } else if(key === "ort"){
            queryChain += `ort:*${term[key]}* AND ort:[* TO *]`;
          } else {
            queryChain += `${key}:*${term[key]}*`;
          }
        }
      }
      urlParams = `q=${queryChain}`;
    }
    urlParams += "&hl=on&hl.fl=rohtext&hl.snippets=1&hl.fragsize=250";
    return this.http.get<any>(this.getUrl(`/select?${urlParams}`))
      .pipe(
        tap(_ => this.log('fetched result')),
        map(x => x || {response:{numFound: undefined, docs: []}}),
        catchError(this.handleError('getResults', []))
      );
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
    console.log(`SolrService: ${message}`);
  }
}

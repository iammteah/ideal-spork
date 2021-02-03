import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from "@angular/core";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule,
  MatListModule, MatNativeDateModule,
  MatSlideToggleModule
} from "@angular/material";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {SearchFormComponent} from "./search-form/search-form.component";
import {ResultsComponent} from "./results/results.component";
import {StartpageComponent} from './startpage/startpage.component';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import { SpeechDialogComponent } from './speech-dialog/speech-dialog.component';
import { AdvancedSearchFormComponent } from './advanced-search-form/advanced-search-form.component';
import {WINDOW_PROVIDERS} from "./window.provider";

@NgModule({
  entryComponents:[SpeechDialogComponent],
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultsComponent,
    StartpageComponent,
    SpeechDialogComponent,
    AdvancedSearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatListModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    FormsModule
  ],
  providers: [
    WINDOW_PROVIDERS,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}

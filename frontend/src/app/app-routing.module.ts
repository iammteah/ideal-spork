import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartpageComponent } from "./startpage/startpage.component";
import { ResultsComponent } from "./results/results.component";

const routes:Routes = [
  {
    path: '',
    component: ResultsComponent
  }, {
    path: 'results/:query',
    component: ResultsComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}

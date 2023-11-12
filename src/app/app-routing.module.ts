import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetmenudataComponent } from './getmenudata/getmenudata.component';

const routes: Routes = [
  { path: '', redirectTo: '/getmenudata', pathMatch: 'full'},
  { path: 'getmenudata', component: GetmenudataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

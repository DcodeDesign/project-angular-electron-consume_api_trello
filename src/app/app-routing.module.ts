import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BoardsComponent} from './boards/boards.component';
import {ListsComponent} from './lists/lists.component';

const routes: Routes = [
  { path: '', redirectTo: '/boards', pathMatch: 'full' },
  { path: 'boards', component: BoardsComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'lists/:id', component: ListsComponent },
  { path: 'lists/lists/:id', redirectTo: '/lists', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

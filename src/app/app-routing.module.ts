import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: '**', component: BoardComponent },
];

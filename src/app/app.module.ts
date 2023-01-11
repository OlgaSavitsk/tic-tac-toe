import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './board/square/square.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, AppComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {}

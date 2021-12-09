import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DayComponent } from './home/day/day.component';
import { EmptyDayComponent } from './home/empty-day/empty-day.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DayComponent,
    EmptyDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

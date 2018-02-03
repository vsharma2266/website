import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeightedTreeComponent } from './weighted-tree/weighted-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    WeightedTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

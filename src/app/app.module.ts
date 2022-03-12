import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HledejComponent } from './hledej/hledej.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { UlozjakoComponent } from './ulozjako/ulozjako.component';

@NgModule({
  declarations: [
    AppComponent,
    HledejComponent,
    UlozjakoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [HledejComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

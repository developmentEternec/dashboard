import '../license';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjGaugeModule } from '@grapecity/wijmo.angular2.gauge';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponentService } from './services/dynamic-component.service';


import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WjInputModule,
    WjChartModule,
    WjGridModule,
    WjGaugeModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DynamicComponentService],
  entryComponents: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

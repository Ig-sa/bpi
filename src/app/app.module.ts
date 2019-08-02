import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule }     from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';

import { ChartsModule } from 'ng2-charts';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';
import { ChartAreaComponent } from './components/chart-area/chart-area.component';
import { ChartLineComponent } from './components/chart-line/chart-line.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    TableComponent,
    ChartPieComponent,
    ChartAreaComponent,
    ChartLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

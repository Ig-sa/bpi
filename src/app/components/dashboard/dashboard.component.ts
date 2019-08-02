import { Component, OnInit, OnDestroy } from '@angular/core';
import { SingleDataSet, Label, Color } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { StatusIcon } from '../table/table.component';
import { Subscription } from 'rxjs';
import { DashboardRefreshService, NotifiableData } from 'src/app/services/dashboard-refresh.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Updated data subscription
  subscription: Subscription;

  // Table Aisles
  aisleHeaders: string[];
  aisleRows: any[];
  aisleStatus: StatusIcon;

  // Chart AREA -> Current Load in System
  lineChartDataLoad: ChartDataSets[];
  lineChartLabelsLoad: Label[];

  // Chart LINE -> Entry
  lineChartDataEntry: ChartDataSets[];
  lineChartLabelsEntry: Label[];
  lineChartColorsEntry: Color[]

  // Chart LINE -> Current
  lineChartDataCurrent: ChartDataSets[];
  lineChartLabelsCurrent: Label[];
  lineChartColorsCurrent: Color[]

  // Chart LINE -> Exit
  lineChartDataExit: ChartDataSets[];
  lineChartLabelsExit: Label[];
  lineChartColorsExit: Color[]

  // Table Storages
  storageHeaders: string[];
  storageRows: any[];
  storageStatus: StatusIcon;

  // Chart PIE -> Storage #1
  pieChartLabels1: Label[];
  pieChartData1: SingleDataSet;
  pieChartColors1;

  // Chart PIE -> Storage #2
  pieChartLabels2: Label[];
  pieChartData2: SingleDataSet;
  pieChartColors2;

  // Chart PIE -> Storage TOTAL
  pieChartLabelsTotal: Label[];
  pieChartDataTotal: SingleDataSet;
  pieChartColorsTotal;

  readonly A1: string = 'Aisle 1';
  readonly A2: string = 'Aisle 2';
  readonly A3: string = 'Aisle 3';
  readonly A4: string = 'Aisle 4';
  
  constructor(private dashboardRefresh: DashboardRefreshService) {
    this.aisleHeaders  = ["Aisle", "Status"];
    this.storageHeaders  =  ["Storage", "Status"];
    this.aisleStatus = StatusIcon.LIGHTBULB;
    this.storageStatus = StatusIcon.POWER;

    this.pieChartLabels1 = this.pieChartLabels2 = this.pieChartLabelsTotal = ['Entry','Exits'];
    this.pieChartColors1 = this.pieChartColors2 = this.pieChartColorsTotal = [{ backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'] }];

    this.lineChartColorsEntry = this.lineChartColorsCurrent = this.lineChartColorsExit = [ { borderColor: 'green'}, { borderColor: 'blue'}, { borderColor: 'red'}, { borderColor: 'orange'} ];

    this.subscription = this.dashboardRefresh.getSubject().subscribe((response: NotifiableData) => {
      if (response) {
        // ZONES
        this.aisleRows = response.aisle;
        this.storageRows = response.storage;

        // PIES
        this.pieChartData1 = response[1];
        this.pieChartData2 = response[2];
        this.pieChartDataTotal = response.Total;

        // AREA
        this.lineChartDataLoad = [ response.data ];
        this.lineChartLabelsLoad = response.labels;

        // LINES
        this.lineChartDataEntry = [ 
          { data: response.entries.data.data[0], label: this.A1 },
          { data: response.entries.data.data[1], label: this.A2 },
          { data: response.entries.data.data[2], label: this.A3 },
          { data: response.entries.data.data[3], label: this.A4 },
        ];
        this.lineChartLabelsEntry = response.entries.labels;

        this.lineChartDataExit = [ 
          { data: response.exits.data.data[0], label: this.A1 },
          { data: response.exits.data.data[1], label: this.A2 },
          { data: response.exits.data.data[2], label: this.A3 },
          { data: response.exits.data.data[3], label: this.A4 },
        ];
        this.lineChartLabelsExit = response.exits.labels;

        this.lineChartDataCurrent = [ 
          { data: response.current.data.data[0], label: this.A1 },
          { data: response.current.data.data[1], label: this.A2 },
          { data: response.current.data.data[2], label: this.A3 },
          { data: response.current.data.data[3], label: this.A4 },
        ];
        this.lineChartLabelsCurrent = response.current.labels;
        

      } else {
        // TODO: Mostrar mensaje de error
      }
    });

   }

  async ngOnInit() {
    // Tables
    this.aisleRows = [{ id: 1, status: false }, { id: 2, status: false }, { id: 3, status: false }, { id: 4, status: false }];
    this.storageRows = [{ id: 1, status: false }, { id: 2, status: false }];

    // Chart PIE
    this.pieChartData1 = this.pieChartData2 = this.pieChartDataTotal = [0, 0];

    // Chart AREA
    this.lineChartDataLoad = [ { data: [], label: 'Loads in System' } ];
    this.lineChartLabelsLoad = [];

    // Chart LINE
    this.lineChartDataEntry = this.lineChartDataCurrent =  this.lineChartDataExit = [ 
      { data: [], label: this.A1 },
      { data: [], label: this.A2 },
      { data: [], label: this.A3 },
      { data: [], label: this.A4 },
    ];
    this.lineChartLabelsEntry = this.lineChartLabelsCurrent = this.lineChartLabelsExit = [];
	
	await this.dashboardRefresh.updateDashboard();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

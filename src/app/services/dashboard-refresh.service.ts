import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface NotifiableData {
  aisle?: any[]; // ZONE
  storage?: any[]; // ZONE
  Total?: number[]; // PIE
  1?: number[]; // PIE
  2?: number[]; // PIE
  data?: { data?: number[], label?: string }; // AREA
  labels?: any[] ; // AREA
  entries?: {data?: { data?: any[]}, labels?: any[] };
  exits?:   {data?: { data?: any[]}, labels?: any[] };
  current?: {data?: { data?: any[]}, labels?: any[] };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardRefreshService {

  static urlBase = "http://35.181.124.204";
  static urlZone = DashboardRefreshService.urlBase + "/service.php?item=zone";
  static urlPie =  DashboardRefreshService.urlBase + "/service.php?item=pie";
  static urlArea =  DashboardRefreshService.urlBase + "/service.php?item=area";
  static urlLine =  DashboardRefreshService.urlBase + "/service.php?item=linea";

  private subject = new Subject<any>();
  private timer;

  readonly intervals: number [] =  [15, 30, 60];
  
  private currentUpdateInterval: number = 15;

  constructor(private http: HttpClient) {
    this.currentUpdateInterval = 15;
    this.updateTimer(); 
   }

   updateTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(async ()=>{
      await this.updateDashboard();
    }, this.currentUpdateInterval * 1000);
   }


  // Control de intervalos de actualización
  
  setCurrentUpdateInterval(newInterval: number) {
    this.currentUpdateInterval = newInterval;
    this.updateTimer(); 
  }

  getCurrentUpdateInterval(): number {
    return this.currentUpdateInterval;
  }

  getIntervals(): number [] {
    return this.intervals;
  }

  // Control de actualizaciones del Dashboard (llamadas a servicios)
  async updateItem(url: string) {
    return await this.http.get<any>(url).toPromise();
  }

  async updateDashboard() {
    console.log('Updating dashboard...');
    const promises = [this.updateItem(DashboardRefreshService.urlZone), this.updateItem(DashboardRefreshService.urlPie), this.updateItem(DashboardRefreshService.urlArea), this.updateItem(DashboardRefreshService.urlLine)];
    Promise.all(promises).then(result => {
       console.log(result);
       const data = {...result[0], ...result[1],...result[2],...result[3]};
       this.notifyUpdatedData(data);
    }).catch(error => console.log(`Error in promises`, error));
  }

  // Control de subscripción a cambios
  getSubject() {
    return this.subject.asObservable();
  }

  notifyUpdatedData(data: NotifiableData) {
    this.subject.next(data);
  }
}

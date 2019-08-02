import { Component, ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { DashboardRefreshService } from 'src/app/services/dashboard-refresh.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {


  @ViewChild('currentDate', {static: false})
  public myCurrentDate: ElementRef;

  constructor(private zone: NgZone, private renderer: Renderer2, private dashboardRefresh: DashboardRefreshService) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.renderer.setProperty(this.myCurrentDate.nativeElement, 'textContent', this.getCurrentDate());
      }, 1);
    });  
  }

  getCurrentDate() {
    return new Date().toLocaleString('es-ES', { timeZone: 'UTC' });
  }

  updateRefreshInterval(interval: number) {
    this.dashboardRefresh.setCurrentUpdateInterval(interval);
  }

}

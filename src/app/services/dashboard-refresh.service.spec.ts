import { TestBed, async, inject } from '@angular/core/testing';

import { DashboardRefreshService } from './dashboard-refresh.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardRefreshService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: DashboardRefreshService = TestBed.get(DashboardRefreshService);
    expect(service).toBeTruthy();
  });

  it('refresh aisles and storage status service', (async(done) => {
    const property1 = 'aisle';
    const property2 = 'storage';

    const service: DashboardRefreshService = TestBed.get(DashboardRefreshService);
    const response = await service.updateItem(DashboardRefreshService.urlZone);
    
    expect(response).toBeTruthy();
    expect(response.hasOwnProperty(property1)).toBeTruthy();
    expect(response.hasOwnProperty(property2)).toBeTruthy();

    done();
  }));

  it('refresh entries/exits in storages status', (async(done) => {
    const property1 = '1';
    const property2 = '2';
    const property3 = 'Total';

    const service: DashboardRefreshService = TestBed.get(DashboardRefreshService);
    const response = await service.updateItem(DashboardRefreshService.urlPie);
    
    expect(response).toBeTruthy();
    expect(response.hasOwnProperty(property1)).toBeTruthy();
    expect(response.hasOwnProperty(property2)).toBeTruthy();
    expect(response.hasOwnProperty(property3)).toBeTruthy();

    done();
  }));

  it('refresh loads in system status', (async(done) => {
    const property1 = 'data';
    const property2 = 'labels';

    const service: DashboardRefreshService = TestBed.get(DashboardRefreshService);
    const response = await service.updateItem(DashboardRefreshService.urlArea);
    
    expect(response).toBeTruthy();
    expect(response.hasOwnProperty(property1)).toBeTruthy();
    expect(response.hasOwnProperty(property2)).toBeTruthy();

    done();
  }));

  it('refresh entries/current/exits in aisles status', (async(done) => {
    const property1 = 'entries';
    const property2 = 'exits';
    const property3 = 'current';

    const service: DashboardRefreshService = TestBed.get(DashboardRefreshService);
    const response = await service.updateItem(DashboardRefreshService.urlLine);
    
    expect(response).toBeTruthy();
    expect(response.hasOwnProperty(property1)).toBeTruthy();
    expect(response.hasOwnProperty(property2)).toBeTruthy();
    expect(response.hasOwnProperty(property3)).toBeTruthy();
    
    done();
  }));
  
});

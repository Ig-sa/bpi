import { Component, OnInit, Input } from '@angular/core';

export enum StatusIcon {
  LIGHTBULB, POWER
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() headers: string[];
  @Input() rows: any[];
  @Input() status: StatusIcon;

  constructor() { }

  ngOnInit() {
  }

}

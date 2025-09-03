import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { Asset } from '../../../models/asset.model';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule]
})
export class DataSourceComponent implements OnChanges {
  @Input() asset?: Asset;
   @Input() readonly = false;
  @Output() validityChange = new EventEmitter<boolean>();

  displayedColumns = ['id', 'name', 'type', 'status'];
  dataSource: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asset'] && this.asset) {
      // TODO: Load related sources into dataSource using asset information
      this.dataSource = []; // Load actual data here

      // For demo, assume data is valid once asset is set
      this.validityChange.emit(true);
    } else {
      this.dataSource = [];
      this.validityChange.emit(false);
    }
  }
}

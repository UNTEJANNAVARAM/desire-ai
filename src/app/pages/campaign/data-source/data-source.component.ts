import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-data-source',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.css']
})
export class DataSourceComponent implements OnChanges {
  @Input() asset: any;
  @Output() validityChange = new EventEmitter<boolean>();

  displayedColumns: string[] = ['id', 'name', 'type', 'status'];
  dataSource: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asset'] && this.asset) {
      // Load or update dataSource based on asset if needed
      this.validityChange.emit(true);
    } else {
      this.validityChange.emit(false);
    }
  }
}

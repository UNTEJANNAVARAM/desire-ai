import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-asset-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css']
})
export class AssetDetailsComponent implements OnChanges {
  @Input() asset: any;
  @Output() validityChange = new EventEmitter<boolean>();

  assetForm = new FormGroup({
    assetName: new FormControl(''),
    assetDescription: new FormControl(''),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asset'] && this.asset) {
      this.assetForm.patchValue({
        assetName: this.asset.name ?? '',
        assetDescription: this.asset.description ?? '',
      });
    }
  }

  constructor() {
    this.assetForm.statusChanges.subscribe(() => {
      this.validityChange.emit(this.assetForm.valid);
    });
  }

  onSave() {
    alert('Saved Asset Details:\n' + JSON.stringify(this.assetForm.value, null, 2));
  }
}

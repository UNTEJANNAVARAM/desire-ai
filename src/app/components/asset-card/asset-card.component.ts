import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AssetItem } from '../../services/asset-selection.service';

@Component({
  selector: 'app-asset-card',
  templateUrl: './asset-card.component.html',
  styleUrls: ['./asset-card.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatSlideToggleModule
  ],
})
export class AssetCardComponent {
  @Input() asset!: AssetItem;
  @Input() isSelected: boolean = false;
  @Input() showCheckbox: boolean = true;

  @Output() selectionChange = new EventEmitter<{asset: AssetItem, selected: boolean}>();
  @Output() editAsset = new EventEmitter<AssetItem>();
  @Output() automate = new EventEmitter<{id: string, enabled: boolean}>();

  onSelectionChange(event: any): void {
    this.selectionChange.emit({
      asset: this.asset,
      selected: event.checked
    });
  }

  onEditAsset(): void {
    this.editAsset.emit(this.asset);
  }

  // Fallback image if thumbnail fails to load
  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-thumb.jpg';
  }
}

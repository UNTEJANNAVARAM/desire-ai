import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../../../models/asset.model';

interface AssetBox {
  asset: Asset;
  automate: boolean;
  childrenCount: number;
  selected: boolean;
}

@Component({
  selector: 'app-select-assets',
  templateUrl: './select-assets.component.html',
  styleUrls: ['./select-assets.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SelectAssetsComponent implements OnInit {
  @Input() assets: Asset[] = [];
  @Input() selectedAssetIds: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() editAsset = new EventEmitter<Asset>();
  @Output() automateStarted = new EventEmitter<{ parentIds: string[]; childCounts: Record<string, number> }>();

  assetBoxes: AssetBox[] = [];

  ngOnInit() {
    this.assetBoxes = this.assets.map(asset => ({
      asset,
      automate: false,
      childrenCount: 0,
      selected: this.selectedAssetIds.includes(asset.assetId),
    }));
  }

  toggleSelection(index: number): void {
    const box = this.assetBoxes[index];
    box.selected = !box.selected;
    if (!box.selected) {
      // If deselected, also clear automate
      if (box.automate) {
        this.toggleAutomate(index);
      }
    }
    this.emitSelectedIds();
  }

  toggleAutomate(index: number): void {
    const box = this.assetBoxes[index];
    box.automate = !box.automate;
    if (!box.automate) {
      box.childrenCount = 0;
    }
    if (!box.selected) {
      box.selected = true; // Ensure asset is selected if automation enabled
    }
    this.emitSelectedIds();
    this.emitAutomation();
  }

  incrementChildren(index: number): void {
    const box = this.assetBoxes[index];
    if (box.childrenCount < 5) {
      box.childrenCount++;
      this.emitAutomation();
    }
  }

  decrementChildren(index: number): void {
    const box = this.assetBoxes[index];
    if (box.childrenCount > 0) {
      box.childrenCount--;
      this.emitAutomation();
    }
  }

  editAssetClick(asset: Asset): void {
    this.editAsset.emit(asset);
  }

  emitSelectedIds(): void {
    const selectedIds = this.assetBoxes.filter(b => b.selected).map(b => b.asset.assetId);
    this.selectionChange.emit(selectedIds);
  }

  emitAutomation(): void {
    const parentIds = this.assetBoxes.filter(b => b.automate).map(b => b.asset.assetId);
    const childCounts: Record<string, number> = {};
    this.assetBoxes.forEach(b => {
      if (b.automate) {
        childCounts[b.asset.assetId] = b.childrenCount;
      }
    });
    this.automateStarted.emit({ parentIds, childCounts });
  }

  canProceedAutomation(): boolean {
    return this.assetBoxes.some(b => b.automate && b.childrenCount > 0);
  }
}

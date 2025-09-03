import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

import { AssetSelectionService, AssetItem, AssetSelectionState } from '../../services/asset-selection.service';
import { AssetCardComponent } from '../asset-card/asset-card.component';
import { AssetFilterComponent, FilterOptions } from '../asset-filter/asset-filter.component';
import { Subscription } from 'rxjs';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSlideToggleModule,
    FormsModule,
    AssetCardComponent,
    AssetFilterComponent
  ],
})
export class AssetListComponent implements OnInit, OnDestroy {
  assets: AssetItem[] = [];
  filteredAssets: AssetItem[] = [];
  selectionState: AssetSelectionState = {
    selectedAssets: [],
    totalAssets: 0,
    selectedCount: 0
  };
  searchTerm: string = '';
  isListView: boolean = false;

  private subscription = new Subscription();

  constructor(public assetService: AssetSelectionService, private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.loadAssets();
    this.subscribeToSelectionChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadAssets(): void {
    this.assets = this.assetService.getAllAssets();
    this.filteredAssets = [...this.assets];
    this.updateSelectionState();
  }

  private subscribeToSelectionChanges(): void {
    this.subscription.add(
      this.assetService.getSelectionState().subscribe(state => {
        this.selectionState = state;
        // Persist into campaign service for downstream steps
        this.campaignService.setSelectedAssets(state.selectedAssets);
      })
    );
  }

  private updateSelectionState(): void {
    const selectedAssets = this.assetService.getSelectedAssets();
    const totalAssets = this.filteredAssets.length;
    const selectedCount = selectedAssets.length;
    
    this.selectionState = {
      selectedAssets,
      totalAssets,
      selectedCount
    };
  }

  onFilterChange(filters: FilterOptions): void {
    this.filteredAssets = this.assetService.getFilteredAssets(
      filters.searchTerm,
      {
        category: filters.category,
        type: filters.type,
        size: filters.size
      }
    );
    this.updateSelectionState();
  }

  applyQuickSearch(): void {
    this.filteredAssets = this.assetService.getFilteredAssets(this.searchTerm);
    this.updateSelectionState();
  }

  toggleFilterPanel(): void {
    // This is a placeholder for future filter panel toggle if needed
  }

  onAssetSelectionChange(event: {asset: AssetItem, selected: boolean}): void {
    if (event.selected) {
      this.assetService.selectAsset(event.asset);
    } else {
      this.assetService.deselectAsset(event.asset.id);
    }
  }

  onEditAsset(asset: AssetItem): void {
    // Handle edit functionality
    console.log('Edit asset:', asset);
  }

  onAutomate(event: {id: string, enabled: boolean}): void {
    this.assetService.toggleAutomate(event.id, event.enabled);
  }

  selectAllAssets(): void {
    this.assetService.selectAllAssets(this.filteredAssets);
  }

  deselectAllAssets(): void {
    this.assetService.deselectAllAssets();
  }

  onToggleSelectAll(event: any): void {
    if (event.checked) {
      this.selectAllAssets();
    } else {
      this.deselectAllAssets();
    }
  }

  isAllSelected(): boolean {
    return this.selectionState.selectedCount === this.selectionState.totalAssets && this.selectionState.totalAssets > 0;
  }

  isIndeterminate(): boolean {
    return this.selectionState.selectedCount > 0 && this.selectionState.selectedCount < this.selectionState.totalAssets;
  }

  getSelectionSummary(): string {
    if (this.selectionState.totalAssets === 0) {
      return 'No assets available';
    }
    return `Asset selection ${this.selectionState.selectedCount}/${this.selectionState.totalAssets}`;
  }

  clearSelection(): void {
    this.assetService.clearSelection();
  }

  setGridView(): void { this.isListView = false; }
  setListView(): void { this.isListView = true; }
}

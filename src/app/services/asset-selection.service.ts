import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AssetItem {
  id: string;
  name: string;
  size: string;
  thumbnail: string;
  category?: string;
  type?: string;
  description?: string;
}

export interface AssetSelectionState {
  selectedAssets: AssetItem[];
  totalAssets: number;
  selectedCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AssetSelectionService {
  private selectionState = new BehaviorSubject<AssetSelectionState>({
    selectedAssets: [],
    totalAssets: 0,
    selectedCount: 0
  });
  private automatedIds = new Set<string>();

  // Mock data for testing
  private mockAssets: AssetItem[] = [
    { 
      id: '1', 
      name: 'Nudge-Card', 
      size: '360x130', 
      thumbnail: 'assets/images/nudge-card-thumb.jpg',
      category: 'Banner',
      type: 'Static',
      description: 'Promotional card for product nudges'
    },
    { 
      id: '2', 
      name: 'PO-Banner', 
      size: '360x130', 
      thumbnail: 'assets/images/po-banner-thumb.jpg',
      category: 'Banner',
      type: 'Static',
      description: 'Product offer banner'
    },
    { 
      id: '3', 
      name: 'POHS', 
      size: '360x130', 
      thumbnail: 'assets/images/pohs-thumb.jpg',
      category: 'Banner',
      type: 'Static',
      description: 'Product offer hero section'
    },
    { 
      id: '4', 
      name: 'Carousel-Banner', 
      size: '360x130', 
      thumbnail: 'assets/images/carousel-thumb.jpg',
      category: 'Banner',
      type: 'Dynamic',
      description: 'Rotating carousel banner'
    },
    { 
      id: '5', 
      name: 'Chiclet', 
      size: '360x130', 
      thumbnail: 'assets/images/chiclet-thumb.jpg',
      category: 'Banner',
      type: 'Static',
      description: 'Compact promotional element'
    },
    { 
      id: '6', 
      name: 'VS-Presearch-Banner', 
      size: '360x130', 
      thumbnail: 'assets/images/vs-presearch-thumb.jpg',
      category: 'Banner',
      type: 'Static',
      description: 'Valentine\'s Day presearch banner'
    }
  ];

  constructor() {
    this.updateTotalAssets();
  }

  // Get current selection state
  getSelectionState(): Observable<AssetSelectionState> {
    return this.selectionState.asObservable();
  }

  // Get all assets
  getAllAssets(): AssetItem[] {
    return [...this.mockAssets];
  }

  // Get filtered assets
  getFilteredAssets(searchTerm: string = '', filters: any = {}): AssetItem[] {
    let filtered = [...this.mockAssets];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(asset => asset.category === filters.category);
    }

    // Apply type filter
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(asset => asset.type === filters.type);
    }

    // Apply size filter
    if (filters.size && filters.size !== 'all') {
      filtered = filtered.filter(asset => asset.size === filters.size);
    }

    return filtered;
  }

  // Select an asset
  selectAsset(asset: AssetItem): void {
    const currentState = this.selectionState.value;
    if (!currentState.selectedAssets.find(a => a.id === asset.id)) {
      const newState = {
        ...currentState,
        selectedAssets: [...currentState.selectedAssets, asset],
        selectedCount: currentState.selectedCount + 1
      };
      this.selectionState.next(newState);
    }
  }

  // Deselect an asset
  deselectAsset(assetId: string): void {
    const currentState = this.selectionState.value;
    const newState = {
      ...currentState,
      selectedAssets: currentState.selectedAssets.filter(a => a.id !== assetId),
      selectedCount: currentState.selectedCount - 1
    };
    this.selectionState.next(newState);
  }

  // Select all assets
  selectAllAssets(assets: AssetItem[]): void {
    const newState = {
      selectedAssets: [...assets],
      totalAssets: assets.length,
      selectedCount: assets.length
    };
    this.selectionState.next(newState);
  }

  // Deselect all assets
  deselectAllAssets(): void {
    const newState = {
      selectedAssets: [],
      totalAssets: this.selectionState.value.totalAssets,
      selectedCount: 0
    };
    this.selectionState.next(newState);
  }

  // Check if asset is selected
  isAssetSelected(assetId: string): boolean {
    return this.selectionState.value.selectedAssets.some(a => a.id === assetId);
  }

  // Get selected assets
  getSelectedAssets(): AssetItem[] {
    return this.selectionState.value.selectedAssets;
  }

  // Get selected count
  getSelectedCount(): number {
    return this.selectionState.value.selectedCount;
  }

  // Clear selection
  clearSelection(): void {
    this.deselectAllAssets();
  }

  // Automation management
  toggleAutomate(assetId: string, enabled: boolean): void {
    if (enabled) {
      this.automatedIds.add(assetId);
    } else {
      this.automatedIds.delete(assetId);
    }
  }

  isAutomated(assetId: string): boolean {
    return this.automatedIds.has(assetId);
  }

  getAutomatedIds(): string[] {
    return Array.from(this.automatedIds);
  }

  private updateTotalAssets(): void {
    const currentState = this.selectionState.value;
    const newState = {
      ...currentState,
      totalAssets: this.mockAssets.length
    };
    this.selectionState.next(newState);
  }
}

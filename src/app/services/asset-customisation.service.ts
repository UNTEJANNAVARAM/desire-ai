import { Injectable } from '@angular/core';

export interface Asset {
  id: number;
  heroCopy: string;
  secondaryText: string;
  cta: string;
  companyLogo?: string;
  sponsorLogos?: string[];
  productImage?: string;
  backgroundImage?: string;   // NEW: support background
  brandLogos?: string[];      // NEW: support brand logos
  brightness?: number;        // NEW: support brightness
  shine?: number;             // NEW: support shine
}

export interface DataSource {
  type: string; // e.g. "googlesheet" | "attachment"
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class AssetCustomisationService {
  private assets: Asset[] = [];
  private currentAsset: Asset | null = null;
  private dataSource: DataSource | null = null; // NEW

  constructor() {
    // Mock data for now
    this.assets = [
      {
        id: 1,
        heroCopy: 'Find the perfect Valentine’s gift!',
        secondaryText: 'Want cards, teddies, chocolates, hampers & more?',
        cta: 'Shop now',
        companyLogo: '',
        sponsorLogos: [],
        productImage: '',
        backgroundImage: '',
        brandLogos: [],
        brightness: 50,
        shine: 0.5
      },
      {
        id: 2,
        heroCopy: 'Your next adventure starts here!',
        secondaryText: 'Flights, hotels, and more at amazing discounts',
        cta: 'Book now',
        companyLogo: '',
        sponsorLogos: [],
        productImage: '',
        backgroundImage: '',
        brandLogos: [],
        brightness: 50,
        shine: 0.5
      }
    ];

    // Default to first asset
    this.currentAsset = this.assets[0];
  }

  /** Get all assets */
  getAssets(): Asset[] {
    return this.assets;
  }

  /** Get the current asset */
  getCurrentAsset(): Asset | null {
    return this.currentAsset;
  }

  /** Set which asset is active */
  setCurrentAsset(id: number): void {
    const found = this.assets.find(asset => asset.id === id);
    if (found) {
      this.currentAsset = found;
    }
  }

  /**
   * Update asset (single or bulk)
   * @param assetData - fields to update
   * @param options - set bulk=true to apply to all assets
   */
  updateAsset(assetData: Partial<Asset>, options?: { bulk?: boolean }) {
    if (options?.bulk) {
      this.assets = this.assets.map(asset => ({
        ...asset,
        ...assetData
      }));
    } else if (this.currentAsset) {
      Object.assign(this.currentAsset, assetData);
    }
  }

  /** Replace all assets at once (useful for sidebar SaveAll) */
  updateAssets(updatedAssets: Asset[]): void {
    this.assets = updatedAssets;
  }

  /** --- Data Source handling --- */
  updateDataSource(ds: DataSource): void {
    this.dataSource = ds;
  }

  getDataSource(): DataSource | null {
    return this.dataSource;
  }
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Asset } from '../models/asset.model';
import { ASSETS } from '../data/asset.data'; // your dummy data file

@Injectable({ providedIn: 'root' })
export class AssetService {
  constructor() {}

  getAssets(templateId: string): Observable<Asset[]> {
    // Return filtered dummy assets by templateId
    const filteredAssets = ASSETS.filter(asset => asset.templateId === templateId);
    return of(filteredAssets);
  }
}

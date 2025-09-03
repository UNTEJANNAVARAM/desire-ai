import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface FigmaAssetData {
  secondaryText: string;
  heroCopy: string;
  ctaText: string;
  productImageUrl: string;
  // Add more if needed
}

@Injectable({
  providedIn: 'root'
})
export class FigmaService {

  constructor() {}

  // Mock fetching Figma data by figmaId
  getFigmaData(figmaId: string): Observable<FigmaAssetData> {
    // Mock data simulating API response
    const mockData: FigmaAssetData = {
      secondaryText: "Want cards, teddies, chocolates, hampers & more?",
      heroCopy: "Find the perfect Valentine's gift!",
      ctaText: "Shop now",
      productImageUrl: "https://example.com/images/nudge-card.png"
    };

    // Return mock data as Observable to simulate HTTP call
    return of(mockData);
  }
}

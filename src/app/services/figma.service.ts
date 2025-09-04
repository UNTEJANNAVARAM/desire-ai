import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FIGMA } from '../data/figma.data';
import { FigmaAssetData } from '../models/figma.model';

@Injectable({ providedIn: 'root' })
export class FigmaService {
  getFigmaData(figmaId: string): Observable<FigmaAssetData | null> {
    const data = FIGMA.find(item => item.figmaId === figmaId) || null;
    return of(data);
  }
}

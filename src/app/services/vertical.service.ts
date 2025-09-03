import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VerticalOption } from '../components/vertical-selector/vertical-selector.component';
import { VERTICALS } from '../data/vertical.data';

@Injectable({ providedIn: 'root' })
export class VerticalService {
  getVerticals(): Observable<VerticalOption[]> {
    return of(VERTICALS);
  }
}

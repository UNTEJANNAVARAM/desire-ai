import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vertical } from '../models/vertical.model';
import { VERTICALS } from '../data/vertical.data';

@Injectable({ providedIn: 'root' })
export class VerticalService {
  getVerticals(): Observable<Vertical[]> {
    return of(VERTICALS);
  }
}

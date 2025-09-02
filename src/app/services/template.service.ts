import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Template } from '../models/template.model';
import { TEMPLATES } from '../data/template.data';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  getTemplates(verticalId: string): Observable<Template[]> {
    const filtered = TEMPLATES.filter(t => t.verticalId === verticalId);
    return of(filtered);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TemplateCard } from '../components/template-card/template-card.component';
import { TEMPLATES } from '../data/template.data';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  getTemplates(verticalId: string, subCategory?: string): Observable<TemplateCard[]> {
    let filtered = TEMPLATES.filter(t => t.verticalId === verticalId);
    
    if (subCategory) {
      filtered = filtered.filter(t => t.subCategory === subCategory);
    }
    
    return of(filtered);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vertical, Template, Asset, Campaign, CampaignResponse } from '../models/models';
import { DUMMIES } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  getVerticals(): Observable<Vertical[]> {
    return of(DUMMIES.VERTICALS);
  }

  getTemplates(verticalId: string): Observable<Template[]> {
    const templates = DUMMIES.TEMPLATES.filter(t => t.verticalId === verticalId);
    return of(templates);
  }

  getAssets(templateId: string): Observable<Asset[]> {
    const assets = DUMMIES.ASSETS.filter(a => a.templateId === templateId);
    return of(assets);
  }

  createCampaign(campaign: Campaign): Observable<CampaignResponse> {
    // simulate cloning asset IDs with "_cloned" suffix (index appended)
    const clonedAssets = campaign.assets.map((id, i) => id + '_cloned_' + i);
    const response: CampaignResponse = {
       ...campaign,
       campaignId: 'cmp_' + Math.floor(Math.random() * 100000).toString(),
       assets: clonedAssets,
    };
    return of(response);
  }
}

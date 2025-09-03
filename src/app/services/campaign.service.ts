import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Campaign, CampaignResponse } from '../models/campaign.model';
import { TemplateCard } from '../components/template-card/template-card.component';
import { VerticalOption } from '../components/vertical-selector/vertical-selector.component';

export interface CampaignSelection {
  verticalId: string;
  subCategory?: string;
  templateId: string;
  template?: TemplateCard;
}

@Injectable({ providedIn: 'root' })
export class CampaignService {
  private selectedTemplateSubject = new BehaviorSubject<CampaignSelection | null>(null);
  public selectedTemplate$ = this.selectedTemplateSubject.asObservable();

  constructor(private http: HttpClient) {}

  createCampaign(campaign: Campaign): Observable<CampaignResponse> {
    return this.http.post<CampaignResponse>(`/api/v1/campaign/create`, campaign);
  }

  getCampaign(campaignId: string): Observable<CampaignResponse> {
    return this.http.get<CampaignResponse>(`/api/v1/campaign/${campaignId}/get`);
  }

  // For dashboard/listing
  getAllCampaigns(): Observable<CampaignResponse[]> {
    // Adjust endpoint to your backend API. Example:
    return this.http.get<CampaignResponse[]>(`/api/v1/campaign/list`);
  }

  // Save selected template and vertical information
  saveTemplateSelection(selection: CampaignSelection): void {
    this.selectedTemplateSubject.next(selection);
  }

  // Get current selection
  getCurrentSelection(): CampaignSelection | null {
    return this.selectedTemplateSubject.value;
  }

  // Clear selection
  clearSelection(): void {
    this.selectedTemplateSubject.next(null);
  }
}

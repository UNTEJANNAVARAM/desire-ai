import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign, CampaignResponse } from '../models/campaign.model';

@Injectable({ providedIn: 'root' })
export class CampaignService {
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
}

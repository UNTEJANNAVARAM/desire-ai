import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CampaignWizardService {
  private campaignData: any = {}; // central store for wizard data

  setStepData(step: string, data: any) {
    this.campaignData[step] = data;
  }

  getStepData(step: string) {
    return this.campaignData[step] || {};
  }

  getAllData() {
    return this.campaignData;
  }
}

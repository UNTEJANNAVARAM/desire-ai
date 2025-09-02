export interface Campaign {
  campaignName: string;
  campaignDescription: string;
  fromDate: string;
  toDate: string;
  verticalId: string;
  templateId: string;
  assets: string[];
}

export interface CampaignResponse {
  campaignId: string;
  campaignName: string;
  campaignDescription: string;
  fromDate: string;
  toDate: string;
  verticalId: string;
  templateId: string;
  assets: string[];
}

// models.ts

export interface Vertical {
  verticalId: string;
  verticalname: string;
}

export interface Template {
  verticalId: string;
  templateId: string;
  templatename: string;
}

export interface Asset {
  assetname: string;
  description: string;
  figmaURL: string;
  figmaId: string;
  assetId: string;
  templateId: string;
  verticalId: string;
}

export interface Campaign {
  campaignname: string;
  description: string;
  fromdate: string;
  todate: string;
  verticalId: string;
  templateId: string;
  assets: string[]; // list of asset ids
}

export interface CampaignResponse {
  campaignId: string;
  campaignname: string;
  description: string;
  fromdate: string;
  todate: string;
  verticalId: string;
  templateId: string;
  assets: string[]; // cloned asset ids
}

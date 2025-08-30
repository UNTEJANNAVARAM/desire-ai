import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CampaignService } from '../../services/campaign.service';

import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';

import { SelectThemeComponent } from './select-theme/select-theme.component';

import { SelectAssetsComponent } from './select-assets/select-assets.component';

import { AutomationComponent } from './automation/automation.component';

import { AssetDetailsComponent } from './asset-details/asset-details.component';

import { DataSourceComponent } from './data-source/data-source.component';

@Component({

  selector: 'app-campaign',

  templateUrl: './campaign.component.html',

  styleUrls: ['./campaign.component.css'],

  standalone: true,

  imports: [

    CommonModule,

    CampaignDetailsComponent,

    SelectThemeComponent,

    SelectAssetsComponent,

    AutomationComponent,

    AssetDetailsComponent,

    DataSourceComponent

  ],

})

export class CampaignComponent implements OnInit {

  stepIndex = 0;

  verticals = [];

  templates = [];

  assets = [];

  selectedVerticalId?: string;

  selectedTemplateId?: string;

  selectedAssetIds: string[] = [];

  currentAsset: any = null;

  campaignDetails = {

    campaignname: '',

    description: '',

    fromdate: '',

    todate: ''

  };

  isValid = Array(6).fill(false);

  part1Open = true;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {

    this.loadVerticals();

  }

  loadVerticals() {

    this.campaignService.getVerticals().subscribe(data => this.verticals = data);

  }

  onCampaignDetailsValidity(valid: boolean) {

    this.isValid[0] = valid;

  }

  onVerticalSelected(id: string) {

    this.selectedVerticalId = id;

    this.loadTemplates(id);

  }

  loadTemplates(verticalId: string) {

    this.campaignService.getTemplates(verticalId).subscribe(data => { 

      this.templates = data;

      this.selectedTemplateId = undefined;

      this.isValid[1] = false;

    });

  }

  onTemplateSelected(id: string) {

    this.selectedTemplateId = id;

    this.loadAssets(id);

    this.isValid[1] = !!id;

  }

  loadAssets(templateId: string) {

    this.campaignService.getAssets(templateId).subscribe(data => {

      this.assets = data;

      this.selectedAssetIds = [];

      this.isValid[2] = false;

    });

  }

  onAssetsSelected(ids: string[]) {

    this.selectedAssetIds = ids;

    this.isValid[2] = ids.length > 0;

  }

  onAutomationToggle(enabled: boolean) {

    this.stepIndex = enabled ? 3 : 4;

    this.isValid[3] = enabled ? false : true;

  }

  onAutomationDone(done: boolean) {

    this.isValid[3] = done;

  }

  onSelectAsset(asset: any) {

    this.currentAsset = asset;

    this.stepIndex = 4;

  }

  onAssetValidity(valid: boolean) {

    this.isValid[4] = valid;

  }

  onDataSourceValidity(valid: boolean) {

    this.isValid[5] = valid;

  }

  canGoBack(): boolean {

    return this.stepIndex > 0;

  }

  canGoNext(): boolean {

    return this.isValid[this.stepIndex];

  }

  back() {

    if (this.canGoBack()) {

      if (this.stepIndex === 4 && this.currentAsset && this.selectedAssetIds.length > 0) {

        this.stepIndex = 2; // back to select-assets if editing assets

      } else {

        this.stepIndex--;

      }

    }

  }

  next() {

    if (this.canGoNext()) {

      if (this.stepIndex === 2) {

        // On next from Select Assets, check automation toggle state, decide step

        if (this.isValid[3] === false) {

          this.stepIndex = 3; // Automation

        } else {

          this.stepIndex = 4; // Asset Details directly

        }

      } else if (this.stepIndex === 4 && this.isValid[4]) {

        this.stepIndex = 5; // Data Source

      } else {

        this.stepIndex++;

      }

    }

  }

  togglePart1() {

    this.part1Open = !this.part1Open;

  }

}

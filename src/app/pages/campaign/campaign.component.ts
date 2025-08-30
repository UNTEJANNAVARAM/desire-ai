import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    DataSourceComponent,
  ],
})
export class CampaignComponent {
  // Step tracking for each part
  part1Step: 1 | 2 = 1; // Campaign Details (1), Select Theme (2)
  part2Step: 1 | 2 = 1; // Select Assets (1), Automation (2)
  part3Step: 1 | 2 = 1; // Asset Details (1), Data Source (2)

  // Validation flags per part
  isCampaignValid = false;
  isThemeSelected = false;
  isAssetsSelected = false;
  isAutomationDone = false;
  isAssetValid = false;
  isDataSourceValid = false;

  currentAsset: any = null;

  // PART 1 handlers
  onCampaignValidity(valid: boolean) {
    this.isCampaignValid = valid;
  }

  onThemeSelected(selected: boolean) {
    this.isThemeSelected = selected;
  }

  nextPart1() {
    if (this.isCampaignValid) {
      this.part1Step = 2;
    }
  }

  backPart1() {
    if (this.part1Step === 2) {
      this.part1Step = 1;
    }
  }

  // PART 2 handlers
  onAssetsSelected(selected: boolean) {
    this.isAssetsSelected = selected;
  }

 onAutomationToggle(enabled: boolean) {
  if (enabled) {
    this.part2Step = 2;
  } else {
    this.part2Step = 1;
  }
  this.isAutomationDone = false; // reset state
}


  onAutomationDone(done: boolean) {
    this.isAutomationDone = done;
  }

  nextPart2() {
    if (this.isAssetsSelected) {
      this.part2Step = 2;
    }
  }

  backPart2() {
    if (this.part2Step === 2) {
      this.part2Step = 1;
    }
  }

  onSelectAsset(asset: any) {
    this.currentAsset = asset;
    this.part3Step = 1; // Open asset details in part 3
  }

  // PART 3 handlers
  onAssetValidity(valid: boolean) {
    this.isAssetValid = valid;
  }

  onDataSourceValidity(valid: boolean) {
    this.isDataSourceValid = valid;
  }

  nextPart3() {
    if (this.isAssetValid) {
      this.part3Step = 2;
    }
  }

  backPart3() {
    if (this.part3Step === 2) {
      this.part3Step = 1;
    }
  }
}

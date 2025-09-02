import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { SelectThemeComponent } from './select-theme/select-theme.component';
import { SelectAssetsComponent } from './select-assets/select-assets.component';
import { AutomationComponent } from './automation/automation.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { DataSourceComponent } from './data-source/data-source.component';
import { MainCtaComponent } from '../../components/main-cta/main-cta.component';

import { VerticalService } from '../../services/vertical.service';
import { TemplateService } from '../../services/template.service';
import { AssetService } from '../../services/asset.service';

import { Vertical } from '../../models/vertical.model';
import { Template } from '../../models/template.model';
import { Asset } from '../../models/asset.model';

type Step = 'details' | 'theme' | 'assets' | 'automation' | 'asset-details' | 'data-source';

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
    MainCtaComponent,
  ],
})
export class CampaignComponent {
  step: Step = 'details';

  verticals: Vertical[] = [];
  templates: Template[] = [];
  assets: Asset[] = [];

  selectedVertical = '';
  selectedTemplate = '';
  selectedAssetsIds: string[] = [];
  automatedAssets: { parentId: string; childCount: number }[] = [];

  selectedAssetForDetails: Asset | null = null;

  isDetailsValid = false;
  isThemeValid = false;
  isAssetsValid = false;
  isAutomationValid = false;
  isAssetDetailsValid = false;
  isDataSourceValid = false;

  bulkEditMode = false;

  constructor(
    private verticalService: VerticalService,
    private templateService: TemplateService,
    private assetService: AssetService,
  ) {}

  ngOnInit() {
    this.verticalService.getVerticals()
      .subscribe((data: Vertical[]) => (this.verticals = data));
  }

  onDetailsValidity(valid: boolean) {
    this.isDetailsValid = valid;
  }

  onVerticalSelected(verticalId: string) {
    this.selectedVertical = verticalId;
    this.selectedTemplate = '';
    this.isThemeValid = false;
    this.templates = [];
    this.assets = [];
    this.selectedAssetsIds = [];
    this.automatedAssets = [];
    this.isAssetsValid = false;
    this.isAutomationValid = false;
    this.isAssetDetailsValid = false;
    this.isDataSourceValid = false;
    this.selectedAssetForDetails = null;

    if (verticalId) {
      this.templateService.getTemplates(verticalId)
        .subscribe((data: Template[]) => (this.templates = data));
    }
  }

  onTemplateSelected(templateId: string) {
    this.selectedTemplate = templateId;
    this.isThemeValid = !!templateId;
  }

  onAssetsSelected(selectedIds: string[]) {
    this.selectedAssetsIds = selectedIds;
    this.isAssetsValid = selectedIds.length > 0;
  }

  get automatedParentIds(): string[] {
    return this.automatedAssets.map(a => a.parentId);
  }

  toggleAutomate(parentIds: string[]) {
    this.automatedAssets = parentIds.map(id => {
      const existing = this.automatedAssets.find(a => a.parentId === id);
      return existing ?? { parentId: id, childCount: 0 };
    });
    this.updateAutomationValidity();
  }

 increaseChildCount(event: any) {
  const id = event as string;
  const asset = this.automatedAssets.find(a => a.parentId === id);
  if (asset && asset.childCount < 5) {
    asset.childCount++;
    this.updateAutomationValidity();
  }
}

decreaseChildCount(event: any) {
  const id = event as string;
  const asset = this.automatedAssets.find(a => a.parentId === id);
  if (asset && asset.childCount > 0) {
    asset.childCount--;
    this.updateAutomationValidity();
  }
}



  updateAutomation() {
    this.updateAutomationValidity();
  }

  updateAutomationValidity() {
    this.isAutomationValid = this.automatedAssets.some(a => a.childCount > 0);
  }

  onAssetSelected(asset: Asset) {
    this.selectedAssetForDetails = asset;
  }

  onAssetDetailsValidity(valid: boolean) {
    this.isAssetDetailsValid = valid;
  }

  onDataSourceValidity(valid: boolean) {
    this.isDataSourceValid = valid;
  }

  canGoBack(): boolean {
    return this.step !== 'details';
  }

  canGoNext(): boolean {
    switch (this.step) {
      case 'details': return this.isDetailsValid;
      case 'theme': return this.isThemeValid;
      case 'assets': return this.isAssetsValid;
      case 'automation': return this.isAutomationValid;
      case 'asset-details': return this.isAssetDetailsValid;
      case 'data-source': return this.isDataSourceValid;
      default: return false;
    }
  }

  onNext() {
    if (!this.canGoNext()) return;
    switch (this.step) {
      case 'details':
        this.step = 'theme';
        break;
      case 'theme':
        this.step = 'assets';
        this.loadAssets();
        break;
      case 'assets':
        this.step = 'automation';
        break;
      case 'automation':
        if (this.selectedAssetForDetails) this.step = 'asset-details';
        break;
      case 'asset-details':
        this.step = 'data-source';
        break;
    }
  }

  onBack() {
    switch (this.step) {
      case 'theme':
        this.step = 'details';
        break;
      case 'assets':
        this.step = 'theme';
        break;
      case 'automation':
        this.step = 'assets';
        break;
      case 'asset-details':
        this.step = 'automation';
        break;
      case 'data-source':
        this.step = 'asset-details';
        break;
    }
  }

  loadAssets() {
    if (!this.selectedTemplate) {
      this.assets = [];
      this.selectedAssetsIds = [];
      this.automatedAssets = [];
      this.isAssetsValid = false;
      this.isAutomationValid = false;
      this.selectedAssetForDetails = null;
      return;
    }
    this.assetService.getAssets(this.selectedTemplate)
      .subscribe((data: Asset[]) => {
        this.assets = data;
        this.selectedAssetsIds = [];
        this.automatedAssets = [];
        this.isAssetsValid = false;
        this.isAutomationValid = false;
        this.selectedAssetForDetails = null;
      });
  }

  onEditAsset(asset: Asset) {
    this.selectedAssetForDetails = asset;
    this.step = 'asset-details';
  }

  getAssetName(id: string): string {
    const found = this.assets.find(a => a.assetId === id);
    return found ? found.assetname : '';
  }
}

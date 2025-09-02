import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { SelectThemeComponent } from './select-theme/select-theme.component';
import { SelectAssetsComponent } from './select-assets/select-assets.component';
import { AutomationComponent } from './automation/automation.component';
import { MainCtaComponent } from '../../components/main-cta/main-cta.component';

import { VerticalService } from '../../services/vertical.service';
import { TemplateService } from '../../services/template.service';
import { AssetService } from '../../services/asset.service';

import { Vertical } from '../../models/vertical.model';
import { Template } from '../../models/template.model';
import { Asset } from '../../models/asset.model';

type Step = 'details' | 'theme' | 'assets' | 'automation';

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
  selectedAssetIds: string[] = [];
  automatedAssets: { parentId: string; childCount: number }[] = [];

  isDetailsValid = false;
  isThemeValid = false;
  isAssetsValid = false;
  isAutomationValid = false;
  bulkEditMode = false;

  constructor(
    private verticalService: VerticalService,
    private templateService: TemplateService,
    private assetService: AssetService
  ) {}

  ngOnInit() {
    this.verticalService.getVerticals().subscribe(data => (this.verticals = data));
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
    this.selectedAssetIds = [];
    this.automatedAssets = [];
    this.isAssetsValid = false;
    this.isAutomationValid = false;

    if (verticalId) {
      this.templateService.getTemplates(verticalId).subscribe(data => (this.templates = data));
    }
  }

  onTemplateSelected(templateId: string) {
    this.selectedTemplate = templateId;
    this.isThemeValid = !!templateId;
  }

  onAssetsSelected(selectedIds: string[]) {
    this.selectedAssetIds = selectedIds;
    this.isAssetsValid = selectedIds.length > 0;
  }

  toggleAutomate(parentId: string, selected: boolean) {
    if (selected) {
      if (!this.automatedAssets.some(a => a.parentId === parentId)) {
        this.automatedAssets.push({ parentId, childCount: 0 });
      }
    } else {
      this.automatedAssets = this.automatedAssets.filter(a => a.parentId !== parentId);
    }
    this.updateAutomationValidity();
  }

  increaseChildCount(parentId: string) {
    const asset = this.automatedAssets.find(a => a.parentId === parentId);
    if (asset && asset.childCount < 5) {
      asset.childCount++;
      this.updateAutomationValidity();
    }
  }

  decreaseChildCount(parentId: string) {
    const asset = this.automatedAssets.find(a => a.parentId === parentId);
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

  canGoBack(): boolean {
    return this.step !== 'details';
  }

  canGoNext(): boolean {
    if (this.step === 'details') return this.isDetailsValid;
    if (this.step === 'theme') return this.isThemeValid;
    if (this.step === 'assets') return this.isAssetsValid;
    if (this.step === 'automation') return this.isAutomationValid;
    return false;
  }

  onNext() {
    if (!this.canGoNext()) return;

    if (this.step === 'details') {
      this.step = 'theme';
    } else if (this.step === 'theme') {
      this.step = 'assets';
      this.loadAssets();
    } else if (this.step === 'assets') {
      this.step = 'automation';
    }
  }

  onBack() {
    if (this.step === 'theme') {
      this.step = 'details';
    } else if (this.step === 'assets') {
      this.step = 'theme';
    } else if (this.step === 'automation') {
      this.step = 'assets';
    }
  }

  loadAssets() {
    if (!this.selectedTemplate) {
      this.assets = [];
      return;
    }
    this.assetService.getAssets(this.selectedTemplate).subscribe(data => {
      this.assets = data;
      this.selectedAssetIds = [];
      this.automatedAssets = [];
      this.isAssetsValid = false;
      this.isAutomationValid = false;
    });
  }

  onEditAsset(asset: Asset): void {
    console.log('Edit asset:', asset);
  }

  getAssetNameById(assetId: string): string {
    const found = this.assets.find(a => a.assetId === assetId);
    return found ? found.assetname : '';
  }
}

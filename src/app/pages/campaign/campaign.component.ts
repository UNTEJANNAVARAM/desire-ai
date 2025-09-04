import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component'; 
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { SelectThemeComponent } from './select-theme/select-theme.component';
import { SelectAssetsComponent } from './select-assets/select-assets.component';
import { AutomationComponent } from './automation/automation.component';
import { AssetDetailsComponent } from './asset-details/asset-details.component';
import { MainCtaComponent } from '../../components/main-cta/main-cta.component';
import { VerticalService } from '../../services/vertical.service';
import { TemplateService } from '../../services/template.service';
import { FigmaAssetData } from '../../models/figma.model'
import { Vertical } from '../../models/vertical.model';
import { Template } from '../../models/template.model';
import { Asset } from '../../models/asset.model';
import {FigmaService } from '../../services/figma.service'; 
import { MatIconModule } from '@angular/material/icon'; 
import { AssetService } from '../../services/asset.service';
import { ChangeDetectorRef } from '@angular/core';
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
    MainCtaComponent,
    MatIconModule,
    HeaderComponent,
  ],
})
export class CampaignComponent {
  step: Step = 'details';

  verticals: Vertical[] = [];
  templates: Template[] = [];
  assets: Asset[] = [];
  figma: FigmaAssetData[]=[];

  selectedVertical = '';
  selectedTemplate = '';
  selectedAssetsIds: string[] = [];
  automatedAssets: { parentId: string; childCount: number }[] = [];

  selectedAssetForDetails: Asset | null = null;
  figmaData: FigmaAssetData | null = null;

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
    private figmaService: FigmaService,
    private cd: ChangeDetectorRef
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
  if (asset.figmaId) {
    this.figmaService.getFigmaData(asset.figmaId).subscribe(data => {
      this.figmaData = data;
      this.cd.detectChanges();
    });
  } else {
    this.figmaData = null;
  }
  this.step = 'asset-details';
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
      case 'assets':
        const numSelectedAssets = this.selectedAssetsIds.length;
        const isAutomationOn = this.automatedAssets.length > 0;
        if (numSelectedAssets === 1 && !isAutomationOn) return true; // Single asset edit
        if (numSelectedAssets > 1 && isAutomationOn) return true; // Automation step allowed
        return false;
      case 'details': return this.isDetailsValid;
      case 'theme': return this.isThemeValid;
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
        const singleAssetSelected = this.selectedAssetsIds.length === 1;
        const isAutomationOn = this.automatedAssets.length > 0;

        if (singleAssetSelected && !isAutomationOn) {
          const assetId = this.selectedAssetsIds[0];
          const asset = this.assets.find(a => a.assetId === assetId);
          if (asset) this.onEditAsset(asset);
          this.step = 'asset-details';
        } else if (isAutomationOn) {
          this.step = 'automation';
        }
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

  get numericStep(): number {
    switch (this.step) {
      case 'details': return 0;
      case 'theme': return 0.5;
      case 'assets': return 1;
      case 'automation': return 1.5;
      case 'asset-details': return 2;
      case 'data-source': return 2.5;
      default: return 1;
    }
  }
}

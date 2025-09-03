import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetListComponent } from '../../../components/asset-list/asset-list.component';

@Component({
  selector: 'app-select-assets',
  templateUrl: './select-assets.component.html',
  styleUrls: ['./select-assets.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    AssetListComponent
  ],
})
export class SelectAssetsComponent {
  // This component now delegates to the new AssetListComponent
  // All functionality is handled by the AssetSelectionService and AssetListComponent

export class SelectAssetsComponent implements OnInit {
  @Input() assets: Asset[] = [];
  @Input() automatedIds: string[] = [];
  @Input() selectedAssetIds: string[] = [];
   @Input() readonly = false;
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() automateChanged = new EventEmitter<string[]>();
  @Output() editAsset = new EventEmitter<Asset>();

  ngOnInit() {}

  toggleAutomation(assetId: string, event: MatSlideToggleChange) {
    const checked = event.checked;
    let newAutomated = [...this.automatedIds];
    if (checked) {
      if (!newAutomated.includes(assetId)) {
        newAutomated.push(assetId);
      }
    } else {
      newAutomated = newAutomated.filter(id => id !== assetId);
    }
    this.automateChanged.emit(newAutomated);
  }

  toggleSelection(assetId: string, event: MatCheckboxChange) {
    const checked = event.checked;
    let newSelected = [...this.selectedAssetIds];
    if (checked) {
      if (!newSelected.includes(assetId)) {
        newSelected.push(assetId);
      }
    } else {
      newSelected = newSelected.filter(id => id !== assetId);
    }
    this.selectionChange.emit(newSelected);
  }

  editClicked(asset: Asset) {
    this.editAsset.emit(asset);
  }

}

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
}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../models/asset.model';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { AssetCustomisationService } from '../../../services/asset-customisation.service'; // NEW (adjust path if needed)
import { ImageCustomiserComponent } from '../image-customiser/image-customiser'; 




@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatRadioModule,
    MatTooltipModule,
    ImageCustomiserComponent]
})
export class AssetDetailsComponent implements OnInit {
  @Input() asset!: Asset;
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<Asset>();
  
  assetForm!: FormGroup;

  ngOnInit() {
    this.assetForm = new FormGroup({
      assetname: new FormControl(this.asset.assetname),
      description: new FormControl(this.asset.description)
    });

    this.assetForm.statusChanges.subscribe(() => {
      this.validityChange.emit(this.assetForm.valid);
    });
  }

  secondaryText: string = "Secondary Text";
  heroCopy: string = "Hero Copy";
  ctaText: string = "Shop now";
  brightness: number = 50;
  shine: number = 0.5;
  productImage: string = "";
  backgroundImage: string = "";
  brandLogos: string[] = [];
  selectedDataSource: string = "googlesheet";
  dataSourceLink: string = "";

  // NEW: store multiple assets for bulk editing
  selectedAssets: any[] = [];
  
  constructor(private assetcustomisationService: AssetCustomisationService) {
    // NEW: pull selected assets from CampaignService (or empty array)
    this.selectedAssets = this.assetcustomisationService.getAssets() || [];
  }

  // -------- Sliders --------
  onBrightnessChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.brightness = Number(target.value);
    console.log('Brightness changed to:', this.brightness);
  }

  onShineInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.shine = Number(target.value);
    console.log('Shine changed to:', this.shine);
  }

  // -------- Uploads --------
  onUpload(type: 'logo'): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (type) {
              this.brandLogos.push(e.target.result);
              
          }
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }

  // -------- Edit actions --------
  editProductImage(): void {
    console.log('Edit product image');
  }

  editBackgroundImage(): void {
    console.log('Edit background image');
  }

  editLogo(index: number): void {
    console.log('Edit logo at index:', index);
  }

  deleteAllLogos(): void {
    if (confirm('Are you sure you want to delete all logos?')) {
      this.brandLogos = [];
    }
  }

  // -------- Bulk Edit logic --------
  private applyBulkEdit(): void {
    this.selectedAssets.forEach(asset => {
      asset.secondaryText = this.secondaryText;
      asset.heroCopy = this.heroCopy;
      asset.ctaText = this.ctaText;
      asset.productImage = this.productImage;
      asset.backgroundImage = this.backgroundImage;
      asset.brandLogos = this.brandLogos;
      asset.brightness = this.brightness;
      asset.shine = this.shine;
    });
  }


  // -------- Save methods --------
  saveAsset(): void {
    const assetData = {
      secondaryText: this.secondaryText,
      heroCopy: this.heroCopy,
      ctaText: this.ctaText,
      productImage: this.productImage,
      backgroundImage: this.backgroundImage,
      brandLogos: this.brandLogos,
      brightness: this.brightness,
      shine: this.shine
    };
    
    console.log('Saving asset data:', assetData);
    this.assetcustomisationService.updateAsset(assetData, { bulk: true }); // NEW
  }

  saveDataSource(): void {
    const dataSourceData = {
      type: this.selectedDataSource,
      link: this.dataSourceLink
    };
    
    console.log('Saving data source:', dataSourceData);
    this.assetcustomisationService.updateDataSource(dataSourceData); // NEW
  }

  saveAll(): void {
    const assetData = {
    heroCopy: this.heroCopy,
    secondaryText: this.secondaryText,
    cta: this.ctaText,
    productImage: this.productImage,
    backgroundImage: this.backgroundImage,
    brandLogos: this.brandLogos,
    brightness: this.brightness,
    shine: this.shine
    }; // NEW
    this.assetcustomisationService.updateAsset(assetData, { bulk: true }); // NEW
    this.saveDataSource(); // keep DS logic
    console.log("All changes saved");
  }


  deleteProductImage(): void {
  if (confirm('Are you sure you want to delete the product image?')) {
    this.productImage = '';
  }
}

deleteBackgroundImage(): void {
  if (confirm('Are you sure you want to delete the background image?')) {
    this.backgroundImage = '';
  }
}

deleteLogo(index: number): void {
  if (confirm('Are you sure you want to delete this logo?')) {
    this.brandLogos.splice(index, 1);
  }
}
onLogoReplace(event: any, index: number): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.brandLogos[index] = e.target.result;  // replace specific logo
    };
    reader.readAsDataURL(file);
  }
}



save() {
    const updatedAsset: Asset = {
      ...this.asset,
      assetname: this.assetForm.value.assetname,
      description: this.assetForm.value.description
    };
    this.saved.emit(updatedAsset);
    alert("Asset saved!");
  }
}

// asset-details.component.ts

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FigmaAssetData {
  secondaryText: string;
  heroCopy: string;
  ctaText: string;
  productImageUrl: string | null;
}

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
})
export class AssetDetailsComponent implements OnChanges {
  @Input() assetName: string = 'Nudge-Card';   // Asset name display
  @Input() asset: any;

  @Input() figmaData: FigmaAssetData | null = null;

  secondaryText: string = '';           
  heroCopy: string = '';                 
  ctaText: string = '';                 
  productImageUrl: string | null = null; 

  @Output() secondaryTextChange = new EventEmitter<string>();
  @Output() heroCopyChange = new EventEmitter<string>();
  @Output() ctaTextChange = new EventEmitter<string>();
  @Output() imageUpload = new EventEmitter<File>();
  @Output() validityChange = new EventEmitter<boolean>();

  selectedTab: 'product-image' | 'background' | 'brand-logos' = 'product-image';
  brightness: number = 1;

 ngOnChanges(changes: SimpleChanges) {
  if (changes['figmaData'] && this.figmaData) {
    this.secondaryText = this.figmaData.secondaryText;
    this.heroCopy = this.figmaData.heroCopy;
    this.ctaText = this.figmaData.ctaText;
    this.productImageUrl = this.figmaData.productImageUrl;
  }
}



  selectTab(tab: 'product-image' | 'background' | 'brand-logos') {
    this.selectedTab = tab;
  }

  onSecondaryTextInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.secondaryTextChange.emit(value);
  }

  onHeroCopyInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.heroCopyChange.emit(value);
  }

  onCtaTextInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.ctaTextChange.emit(value);
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imageUpload.emit(file);
    }
  }

  onBrightnessChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.brightness = Number(input.value);
  }

  onSaveClick() {
    this.secondaryTextChange.emit(this.secondaryText);
    this.heroCopyChange.emit(this.heroCopy);
    this.ctaTextChange.emit(this.ctaText);
    this.validityChange.emit(true);
  }
}

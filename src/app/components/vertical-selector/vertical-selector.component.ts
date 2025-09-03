import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export interface VerticalOption {
  id: string;
  name: string;
  subCategories?: string[];
}

@Component({
  selector: 'app-vertical-selector',
  templateUrl: './vertical-selector.component.html',
  styleUrls: ['./vertical-selector.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
})
export class VerticalSelectorComponent {
  @Input() verticals: VerticalOption[] = [];
  @Input() selectedVertical: string = '';
  @Input() selectedSubCategory: string = '';
  @Output() verticalChange = new EventEmitter<{verticalId: string, subCategory?: string}>();

  // Current themes for selected vertical
  currentThemes: string[] = [];

  // Filter button state
  isFilterOpen = false;



  ngOnInit() {
    // Component initialization
  }

  ngOnChanges() {
    this.updateCurrentThemes();
  }

  get selectedVerticalData() {
    return this.verticals.find(v => v.id === this.selectedVertical);
  }

  get subCategories() {
    return this.selectedVerticalData?.subCategories || [];
  }

  private updateCurrentThemes() {
    this.currentThemes = this.selectedVerticalData?.subCategories || [];
  }

  onVerticalSelect(verticalId: string) {
    this.selectedVertical = verticalId;
    this.selectedSubCategory = '';
    this.updateCurrentThemes();
    this.verticalChange.emit({ verticalId });
  }

  onThemeSelect(theme: string) {
    this.selectedSubCategory = theme;
    this.verticalChange.emit({ 
      verticalId: this.selectedVertical, 
      subCategory: theme 
    });
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }
}

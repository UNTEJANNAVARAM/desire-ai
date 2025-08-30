import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['./select-theme.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgIf,
  ],
})
export class SelectThemeComponent {
  @Output() selected = new EventEmitter<boolean>();

  verticals = ['Dineout', 'Restaurant', 'E-commerce', 'Fashion'];

  themes: { [key: string]: string[] } = {
    Dineout: [
      "Valentine Special Blue",
      "Valentine Special Red",
      "Valentine Special Gold",
      "Valentine Special Pink",
      "Valentine Special Brown",
    ],
    Restaurant: ["Fine Dining", "Family Feast"],
    "E-commerce": ["Flash Sale", "Summer Vibes"],
    Fashion: ["Spring Look", "Winter Collection"],
  };

  selectedVertical: string = '';
  filteredThemes: string[] = [];
  selectedTheme: string | null = null;

  constructor(private router: Router) {}

  onVerticalChange() {
    this.filteredThemes = this.themes[this.selectedVertical] || [];
    this.selectedTheme = null;
    this.emitSelection();
  }

  selectTheme(theme: string) {
    this.selectedTheme = theme;
    this.emitSelection();
  }

  emitSelection() {
    const canProceed = Boolean(this.selectedVertical && this.selectedTheme);
    this.selected.emit(canProceed);
  }

  goNext() {
    if (this.selectedVertical && this.selectedTheme) {
      this.router.navigate(['/select-assets']);
    } else {
      alert('Please select both vertical and theme to proceed.');
    }
  }
}

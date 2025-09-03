import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { AssetSelectionService, AssetItem } from '../../services/asset-selection.service';

export interface FilterOptions {
  searchTerm: string;
  category: string;
  type: string;
  size: string;
}

@Component({
  selector: 'app-asset-filter',
  templateUrl: './asset-filter.component.html',
  styleUrls: ['./asset-filter.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
  ],
})
export class AssetFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<FilterOptions>();

  filterForm: FormGroup;
  categories: string[] = [];
  types: string[] = [];
  sizes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private assetService: AssetSelectionService
  ) {
    this.filterForm = this.fb.group({
      searchTerm: [''],
      category: ['all'],
      type: ['all'],
      size: ['all']
    });
  }

  ngOnInit(): void {
    this.loadFilterOptions();
    this.setupFilterListeners();
  }

  private loadFilterOptions(): void {
    const assets = this.assetService.getAllAssets();
    
    // Extract unique categories
    this.categories = ['all', ...new Set(assets.map(a => a.category).filter((cat): cat is string => Boolean(cat)))];
    
    // Extract unique types
    this.types = ['all', ...new Set(assets.map(a => a.type).filter((type): type is string => Boolean(type)))];
    
    // Extract unique sizes
    this.sizes = ['all', ...new Set(assets.map(a => a.size).filter((size): size is string => Boolean(size)))];
  }

  private setupFilterListeners(): void {
    this.filterForm.valueChanges.subscribe(filters => {
      this.filterChange.emit(filters);
    });
  }

  clearFilters(): void {
    this.filterForm.patchValue({
      searchTerm: '',
      category: 'all',
      type: 'all',
      size: 'all'
    });
  }

  getFilterSummary(): string {
    const filters = this.filterForm.value;
    const activeFilters = [];
    
    if (filters.searchTerm) activeFilters.push(`Search: "${filters.searchTerm}"`);
    if (filters.category !== 'all') activeFilters.push(`Category: ${filters.category}`);
    if (filters.type !== 'all') activeFilters.push(`Type: ${filters.type}`);
    if (filters.size !== 'all') activeFilters.push(`Size: ${filters.size}`);
    
    return activeFilters.length > 0 ? activeFilters.join(', ') : 'No filters applied';
  }
}

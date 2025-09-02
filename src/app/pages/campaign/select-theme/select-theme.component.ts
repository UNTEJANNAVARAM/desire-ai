import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { Vertical } from '../../../models/vertical.model';
import { Template } from '../../../models/template.model';

@Component({
  selector: 'app-select-theme',
  templateUrl: './select-theme.component.html',
  styleUrls: ['./select-theme.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
})
export class SelectThemeComponent {
  @Input() verticals: Vertical[] = [];
  @Input() templates: Template[] = [];
  @Output() verticalChange = new EventEmitter<string>();
  @Output() templateChange = new EventEmitter<string>();

  selectedVertical = '';
  selectedTheme = '';

  onVerticalChange() {
    this.selectedTheme = '';
    this.verticalChange.emit(this.selectedVertical);
  }

  onThemeChange() {
    this.templateChange.emit(this.selectedTheme);
  }
}

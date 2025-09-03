import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
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
    MatIconModule,     // add this
    MatCardModule,     // add this
    MatRadioModule 
  ],
})
export class SelectThemeComponent {
  @Input() verticals: Vertical[] = [];
  @Input() templates: Template[] = [];
   @Input() readonly = false;
  @Output() verticalChange = new EventEmitter<string>();
  @Output() templateChange = new EventEmitter<string>();

  selectedVertical = '';
  selectedTheme = '';
  part1Hidden = false;

togglePart1() {
  this.part1Hidden = !this.part1Hidden;
  // Ideally emit event to parent to hide/show campaign details panel
}

selectTheme(templateId: string) {
  this.selectedTheme = templateId;
  this.onThemeChange();
}

 panelCollapsed = false;
canCollapsePanel = true; // Enable based on logic if needed

togglePanel() {
  this.panelCollapsed = !this.panelCollapsed;
}

onTemplateChange() {
  // logic for when template is selected
}


  onVerticalChange() {
    this.selectedTheme = '';
    this.verticalChange.emit(this.selectedVertical);
  }
  hidePanel = false;      // track if panel is hidden
canHidePanel = true;    // enable/disable hide button (adjust as needed)

toggleLeftPanel() {
  this.hidePanel = !this.hidePanel;
  // optionally emit event or notify parent
}

  onThemeChange() {
    this.templateChange.emit(this.selectedTheme);
  }
}

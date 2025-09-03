import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalSelectorComponent, VerticalOption } from '../../../components/vertical-selector/vertical-selector.component';
import { TemplateListComponent } from '../../../components/template-list/template-list.component';
import { TemplateCard } from '../../../components/template-card/template-card.component';

@Component({
  selector: 'app-select-theme-new',
  templateUrl: './select-theme-new.component.html',
  styleUrls: ['./select-theme-new.component.css'],
  standalone: true,
  imports: [CommonModule, VerticalSelectorComponent, TemplateListComponent],
})
export class SelectThemeNewComponent {
  @Input() verticals: VerticalOption[] = [];
  @Input() templates: TemplateCard[] = [];
  @Output() verticalChange = new EventEmitter<{verticalId: string, subCategory?: string}>();
  @Output() templateChange = new EventEmitter<string>();

  selectedVertical = '';
  selectedSubCategory = '';
  selectedTemplateId = '';
  loading = false;



  onVerticalChange(data: {verticalId: string, subCategory?: string}) {
    this.selectedVertical = data.verticalId;
    this.selectedSubCategory = data.subCategory || '';
    this.selectedTemplateId = '';
    this.verticalChange.emit(data);
  }

  onTemplateSelect(templateId: string) {
    this.selectedTemplateId = templateId;
    this.templateChange.emit(templateId);
  }
}

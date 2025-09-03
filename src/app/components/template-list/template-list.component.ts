import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateCardComponent, TemplateCard } from '../template-card/template-card.component';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
  standalone: true,
  imports: [CommonModule, TemplateCardComponent],
})
export class TemplateListComponent {
  @Input() templates: TemplateCard[] = [];
  @Input() selectedTemplateId: string = '';
  @Input() loading: boolean = false;
  @Output() templateSelect = new EventEmitter<string>();

  onTemplateSelect(templateId: string) {
    this.templateSelect.emit(templateId);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TemplateCard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  colors: string[];
  verticalId: string;
  subCategory?: string;
}

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TemplateCardComponent {
  @Input() template: TemplateCard | null = null;
  @Input() isSelected: boolean = false;
  @Output() templateSelect = new EventEmitter<string>();

  onCardClick() {
    if (this.template) {
      this.templateSelect.emit(this.template.id);
    }
  }
}

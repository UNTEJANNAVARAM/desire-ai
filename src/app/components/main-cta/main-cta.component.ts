import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-cta',
  templateUrl: './main-cta.component.html',
  styleUrls: ['./main-cta.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MainCtaComponent {
  @Input() backDisabled = false;
  @Input() nextDisabled = false;

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
}

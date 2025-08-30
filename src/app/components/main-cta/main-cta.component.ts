import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf} from '@angular/common';
@Component({
  selector: 'app-main-cta',
  templateUrl: './main-cta.component.html',
  styleUrls: ['./main-cta.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf]
})
export class MainCtaComponent {
  @Input() step = 1;
  @Input() canProceed = false;
  @Output() nextClicked = new EventEmitter<void>();
  @Output() backClicked = new EventEmitter<void>();
}

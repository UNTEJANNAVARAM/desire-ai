import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule,MatIconModule, MatButtonModule],
})
export class HeaderComponent {
  @Input() activeStep: number = 1;
  @Input() completedSteps: number = 0; // For optional future use
  ngOnChanges() { console.log('Active step is:', this.activeStep); }

}

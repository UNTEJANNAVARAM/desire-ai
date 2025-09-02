import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { Input } from '@angular/core';
@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
})
export class AutomationComponent {
  @Output() automationToggle = new EventEmitter<boolean>();
  @Output() automationDone = new EventEmitter<void>();
  @Input() automatedAssets: { parentId: string; childCount: number }[] = [];
  automationOn = false;

  toggleAutomation(value: string) {
    this.automationOn = value === 'on';
    this.automationToggle.emit(this.automationOn);
  }

  save() {
    this.automationDone.emit();
    alert(`Automation is ${this.automationOn ? 'ON' : 'OFF'}`);
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatCardModule],
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css'],
})
export class AutomationComponent {
  @Output() automationToggle = new EventEmitter<boolean>();
  @Output() automationDone = new EventEmitter<boolean>();

  automationOn: boolean = false;

  toggleAutomation(value: string) {
  this.automationOn = value === 'on';
  this.automationToggle.emit(this.automationOn);
}


  save() {
    this.automationDone.emit(this.automationOn);
    alert(`Automation is ${this.automationOn ? 'ON' : 'OFF'}`);
  }
}

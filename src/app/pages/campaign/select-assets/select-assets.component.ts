import { Component,EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-select-assets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './select-assets.component.html',
  styleUrls: ['./select-assets.component.css']
})
export class SelectAssetsComponent {
   @Output() selectionChange = new EventEmitter<boolean>();
  assetsForm = new FormGroup({
    assets: new FormArray([
      new FormControl(false), // asset 1 selected
      new FormControl(false), // asset 2 selected
      new FormControl(false)  // asset 3 selected
    ])
  });

  assetsList = ['Asset 1', 'Asset 2', 'Asset 3'];

  // Get the FormArray instance for accessing value and controls
  get assetsFormArray(): FormArray {
    return this.assetsForm.get('assets') as FormArray;
  }

  // Get the controls casted as FormControl[] for template binding
  get assets(): FormControl[] {
    return this.assetsFormArray.controls as FormControl[];
  }

  // Toggles the boolean value of the checkbox at given index safely
  selectAsset(index: number): void {
    const control = this.assetsFormArray.at(index);
    if (control) {
      control.setValue(!control.value);
    }
  }

  // Called on Next button click for validation and further action
  onNext(): void {
    if (this.assetsFormArray.value.some((selected: boolean) => selected)) {
      alert('Next: Selected assets: ' + this.getSelectedAssets().join(', '));
    } else {
      alert('Please select at least one asset.');
    }
  }

  // Returns an array of strings for the currently selected assets
  getSelectedAssets(): string[] {
    return this.assetsFormArray.value
      .map((selected: boolean, index: number) => selected ? this.assetsList[index] : null)
      .filter((v: string | null) => v !== null) as string[];
  }
}

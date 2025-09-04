// import { Component, Output, EventEmitter, OnInit } from '@angular/core';
// import { CommonModule, NgIf } from '@angular/common';
// import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-campaign-details',
//   templateUrl: './campaign-details.component.html',
//   styleUrls: ['./campaign-details.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     NgIf,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule
//   ]
// })
// export class CampaignDetailsComponent implements OnInit {
//   @Output() validityChange = new EventEmitter<boolean>();
//   @Output() fileSelected = new EventEmitter<Event>();

//   campaignForm!: FormGroup;

//   ngOnInit() {
//     this.campaignForm = new FormGroup({
//       description: new FormControl('', [Validators.required, Validators.minLength(10)]),
//       offer: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       visual: new FormControl('', [Validators.required, Validators.minLength(10)]),
//       referenceImage: new FormControl(null),
//     });

//     this.campaignForm.statusChanges.subscribe(() => {
//       this.validityChange.emit(this.campaignForm.valid);
//     });
//   }

//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length) {
//       this.campaignForm.patchValue({ referenceImage: input.files[0] });
//     } else {
//       this.campaignForm.patchValue({ referenceImage: null });
//     }
//     this.fileSelected.emit(event);
//   } 
// }

import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// ⬇️ Import wizard service
import { CampaignWizardService } from 'C:/Users/anki2/OneDrive/Desktop/desire-ai-project/src/app/services/campaign-wizard.service'; // <-- added

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CampaignDetailsComponent implements OnInit {
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() fileSelected = new EventEmitter<Event>();

  campaignForm!: FormGroup;

  // ⬇️ Inject wizard service
  constructor(private wizardService: CampaignWizardService) {} // <-- added

  ngOnInit() {
    // ⬇️ Load saved data from wizard service (if available)
    const savedData = this.wizardService.getStepData('campaignDetails'); // <-- added

    this.campaignForm = new FormGroup({
      description: new FormControl(savedData.description || '', [Validators.required, Validators.minLength(10)]), // <-- updated to load saved value
      offer: new FormControl(savedData.offer || '', [Validators.required, Validators.minLength(5)]), // <-- updated
      visual: new FormControl(savedData.visual || '', [Validators.required, Validators.minLength(10)]), // <-- updated
      referenceImage: new FormControl(savedData.referenceImage || null), // <-- updated
    });

    this.campaignForm.statusChanges.subscribe(() => {
      this.validityChange.emit(this.campaignForm.valid);

      // ⬇️ Save form data into wizard service on every change
      this.wizardService.setStepData('campaignDetails', this.campaignForm.value); // <-- added
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.campaignForm.patchValue({ referenceImage: input.files[0] });
    } else {
      this.campaignForm.patchValue({ referenceImage: null });
    }
    this.fileSelected.emit(event);

    // ⬇️ Save again when file changes
    this.wizardService.setStepData('campaignDetails', this.campaignForm.value); // <-- added
  }
}

// #untej
// import { Component, Output, EventEmitter, OnInit } from '@angular/core';
// import { CommonModule} from '@angular/common';
// import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-campaign-details',
//   templateUrl: './campaign-details.component.html',
//   styleUrls: ['./campaign-details.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     MatButtonModule
//   ]
// })
// export class CampaignDetailsComponent implements OnInit {
//   @Output() validityChange = new EventEmitter<boolean>();
//   @Output() fileSelected = new EventEmitter<Event>();

//   campaignForm!: FormGroup;

//   ngOnInit() {
//     this.campaignForm = new FormGroup({
//       description: new FormControl('', [Validators.required, Validators.minLength(10)]),
//       offer: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       visual: new FormControl('', [Validators.required, Validators.minLength(10)]),
//       referenceImage: new FormControl(null),
//     });

//     this.campaignForm.statusChanges.subscribe(() => {
//       this.validityChange.emit(this.campaignForm.valid);
//     });
//   }

//   onFileSelected(event: Event) {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length) {
//       this.campaignForm.patchValue({ referenceImage: input.files[0] });
//     } else {
//       this.campaignForm.patchValue({ referenceImage: null });
//     }
//     this.fileSelected.emit(event);
//   } 
// }
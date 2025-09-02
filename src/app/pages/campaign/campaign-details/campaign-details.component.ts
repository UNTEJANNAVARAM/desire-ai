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

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule, FormControl,  } from '@angular/forms';

// @Component({
//   selector: 'app-campaign-info',
//   templateUrl: './campaign-details.component.html',
//   styleUrls: ['./campaign-details.component.css'],
// })
// export class CampaignDetailsComponent {
//   campaignForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.campaignForm = this.fb.group({
//       campaignName: ['', Validators.required],
//       campaignDescription: [''],
//       fromDate: ['', Validators.required],
//       toDate: ['', Validators.required]
//     });
//   }
// }

import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

  ngOnInit() {
    this.campaignForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      offer: new FormControl('', [Validators.required, Validators.minLength(5)]),
      visual: new FormControl('', [Validators.required, Validators.minLength(10)]),
      referenceImage: new FormControl(null),
    });

    this.campaignForm.statusChanges.subscribe(() => {
      this.validityChange.emit(this.campaignForm.valid);
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
  } 
}
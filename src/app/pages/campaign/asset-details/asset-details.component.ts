import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Asset } from '../../../models/asset.model';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AssetDetailsComponent implements OnInit {
  @Input() asset!: Asset;
  @Output() validityChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<Asset>();

  assetForm!: FormGroup;

  ngOnInit() {
    this.assetForm = new FormGroup({
      assetname: new FormControl(this.asset.assetname),
      description: new FormControl(this.asset.description)
    });

    this.assetForm.statusChanges.subscribe(() => {
      this.validityChange.emit(this.assetForm.valid);
    });
  }

  save() {
    const updatedAsset: Asset = {
      ...this.asset,
      assetname: this.assetForm.value.assetname,
      description: this.assetForm.value.description
    };
    this.saved.emit(updatedAsset);
    alert("Asset saved!");
  }
}

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { InputComponent } from '@/app/components/input/input.component';
import { ButtonComponent } from '@/app/components/button/button.component';
import { vehicleService } from '@/services/vehicles';
import type { UpdateVehicleDTO } from '@/types/vehicle';

@Component({
  selector: 'app-edit-vehicle-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent, InputComponent, ButtonComponent],
  templateUrl: './modal.component.html',
})
export class EditVehicleModalComponent implements OnChanges {
  @Input() id?: number | null;
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onReload = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      chassi: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (!this.isOpen) {
        this.form.reset();
      } else {
        this.loadVehicle();
      }
    }
  }

  async loadVehicle() {
    if (!this.id) return;

    try {
      const data = await vehicleService.getByIdEndpoint.execute(this.id);

      this.form.patchValue({
        chassi: data.chassi,
        brand: data.brand,
        model: data.model,
        year: data.year,
      });
    } catch (error: any) {
      alert(error?.message || 'Algo deu errado');
      this.handleCancel();
    }
  }

  async handleSubmit() {
    if (this.form.invalid || !this.id) return;

    try {
      const data: UpdateVehicleDTO = {
        chassi: this.form.value.chassi.toUpperCase(),
        brand: this.form.value.brand,
        model: this.form.value.model,
        year: Number(this.form.value.year),
      };

      await vehicleService.update.execute(this.id, data);

      this.form.reset();
      this.onClose.emit();
      this.onReload.emit();
    } catch (error: any) {
      alert(error?.message || 'Algo deu errado');
    }
  }

  handleCancel() {
    this.form.reset();
    this.onClose.emit();
  }
}

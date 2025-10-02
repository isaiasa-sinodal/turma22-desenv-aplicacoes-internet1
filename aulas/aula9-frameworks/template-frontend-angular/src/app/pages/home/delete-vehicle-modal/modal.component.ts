import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { ButtonComponent } from '@/app/components/button/button.component';
import { vehicleService } from '@/services/vehicles';
import type { Vehicle } from '@/types/vehicle';

@Component({
  selector: 'app-delete-vehicle-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonComponent],
  templateUrl: './modal.component.html',
})
export class DeleteVehicleModalComponent {
  @Input() vehicle?: Vehicle | null;
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onReload = new EventEmitter<void>();

  async handleConfirm() {
    if (!this.vehicle) return;

    try {
      await vehicleService.delete.execute(this.vehicle.id);

      this.onClose.emit();
      this.onReload.emit();
    } catch (error: any) {
      alert(error?.message || 'Algo deu errado');
    }
  }

  handleCancel() {
    this.onClose.emit();
  }

  get vehicleDescriptionPrefix(): string {
    if (!this.vehicle) return 'este veículo';
    return 'o veículo';
  }

  get vehicleDescription(): string {
    if (!this.vehicle) return '';
    return ` ${this.vehicle.chassi} (${this.vehicle.brand} ${this.vehicle.model} ${this.vehicle.year})`;
  }
}

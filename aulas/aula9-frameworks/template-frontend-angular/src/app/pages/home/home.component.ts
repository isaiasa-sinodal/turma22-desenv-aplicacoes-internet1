import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@/app/components/button/button.component';
import { CreateVehicleModalComponent } from './create-vehicle-modal/modal.component';
import { EditVehicleModalComponent } from './edit-vehicle-modal/modal.component';
import { DeleteVehicleModalComponent } from './delete-vehicle-modal/modal.component';
import { vehicleService } from '@/services/vehicles';
import type { Vehicle } from '@/types/vehicle';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CreateVehicleModalComponent,
    EditVehicleModalComponent,
    DeleteVehicleModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomePage {
  vehicles: Vehicle[] = [];
  isCreateModalOpen = false;
  vehicleToEdit: number | null = null;
  vehicleToDelete: Vehicle | null = null;

  async ngOnInit() {
    await this.handleFetchVehicles();
  }

  async handleFetchVehicles() {
    try {
      this.vehicles = await vehicleService.get.execute();
    } catch (error: any) {
      alert(error?.message || 'Algo deu errado');
    }
  }

  handleReload() {
    this.handleFetchVehicles();
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  selectVehicleToEdit(id: number) {
    this.vehicleToEdit = id;
  }

  closeEditModal() {
    this.vehicleToEdit = null;
  }

  selectVehicleToDelete(vehicle: Vehicle) {
    this.vehicleToDelete = vehicle;
  }

  closeDeleteModal() {
    this.vehicleToDelete = null;
  }
}

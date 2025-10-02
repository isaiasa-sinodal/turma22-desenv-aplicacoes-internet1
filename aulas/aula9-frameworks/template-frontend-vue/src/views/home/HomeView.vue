<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@/components/button/Button.vue'
import { vehicleService } from '@/services/vehicles'
import type { Vehicle } from '@/types/vehicle'
import CreateVehicleModal from './create-vehicle-modal/CreateVehicleModal.vue'
import EditVehicleModal from './edit-vehicle-modal/EditVehicleModal.vue'
import DeleteVehicleModal from './delete-vehicle-modal/DeleteVehicleModal.vue'

const vehicles = ref<Vehicle[]>([])

const isCreateModalOpen = ref(false)
const vehicleToEdit = ref<number | null>(null)
const vehicleToDelete = ref<Vehicle | null>(null)

const fetchVehicles = async () => {
  try {
    vehicles.value = await vehicleService.get.execute()
  } catch (error: any) {
    alert(error?.message || 'Algo deu errado')
  }
}

onMounted(() => {
  fetchVehicles()
})

const reload = () => fetchVehicles()
</script>

<template>
  <div class="homePage">
    <div class="header">
      <h1>Lista de Veículos</h1>
      <Button @click="isCreateModalOpen = true">Novo veículo</Button>
    </div>

    <table v-if="vehicles.length" border="1">
      <thead>
        <tr>
          <th>Chassi</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Ano</th>
          <th class="actionsHeader">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.chassi">
          <td>{{ vehicle.chassi.toUpperCase() }}</td>
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
          <td class="actions">
            <Button size="sm" @click="vehicleToEdit = vehicle.id">Editar</Button>
            <Button size="sm" @click="vehicleToDelete = vehicle">Excluir</Button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="emptyList">
      <p>Não há veículos cadastrados</p>
    </div>

    <!-- Modais -->
    <CreateVehicleModal
      :is-open="isCreateModalOpen"
      @close="isCreateModalOpen = false"
      @reload="reload"
    />

    <EditVehicleModal
      :is-open="!!vehicleToEdit"
      :id="vehicleToEdit"
      @close="vehicleToEdit = null"
      @reload="reload"
    />

    <DeleteVehicleModal
      :is-open="!!vehicleToDelete"
      :vehicle="vehicleToDelete"
      @close="vehicleToDelete = null"
      @reload="reload"
    />
  </div>
</template>

<style scoped>
.homePage {
  padding: 24px;
  max-width: 1400px;
  margin-inline: auto;
}

.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
}

.header h1 {
  font-size: 32px;
}

.homePage table {
  width: 100%;
  border-collapse: collapse;
}

.homePage table th {
  padding: 8px;
  text-align: left;
  background-color: #f5f5f5;
}

.homePage table td {
  padding: 8px;
}

.homePage table .actionsHeader {
  text-align: right;
}

.homePage table .actions {
  width: 140px;
  text-align: right;
}

.homePage table .actions button:not(:first-child) {
  margin-left: 8px;
}

.emptyList p {
  text-align: center;
  margin-top: 24px;
}
</style>

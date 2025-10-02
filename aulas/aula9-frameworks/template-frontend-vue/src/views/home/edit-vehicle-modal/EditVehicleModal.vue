<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '@/components/button/Button.vue'
import Modal from '@/components/modal/Modal.vue'
import Input from '@/components/input/Input.vue'
import { vehicleService } from '@/services/vehicles'
import type { UpdateVehicleDTO } from '@/types/vehicle'

interface Props {
  id?: number | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'reload'): void
}>()

const chassi = ref('')
const brand = ref('')
const model = ref('')
const year = ref<number | null>(null)

const fetchVehicle = async () => {
  if (!props.id) return
  try {
    const data = await vehicleService.getByIdEndpoint.execute(props.id)
    chassi.value = data.chassi
    brand.value = data.brand
    model.value = data.model
    year.value = data.year
  } catch (error: any) {
    alert(error?.message || 'Algo deu errado')
    emit('close')
  }
}

watch(
  () => [props.isOpen, props.id],
  ([isOpen]) => {
    if (!isOpen) {
      chassi.value = ''
      brand.value = ''
      model.value = ''
      year.value = null
    } else {
      fetchVehicle()
    }
  },
)

const handleSubmit = async () => {
  if (!props.id) return
  try {
    const data: UpdateVehicleDTO = {
      chassi: chassi.value.toUpperCase(),
      brand: brand.value,
      model: model.value,
      year: Number(year.value),
    }

    await vehicleService.update.execute(props.id, data)

    chassi.value = ''
    brand.value = ''
    model.value = ''
    year.value = null

    emit('close')
    emit('reload')
  } catch (error: any) {
    alert(error?.message || 'Algo deu errado')
  }
}
</script>

<template>
  <Modal title="Editar Veículo" :is-open="isOpen" @close="emit('close')">
    <form @submit.prevent="handleSubmit">
      <Input v-model="chassi" name="chassi" label="Chassi" required />
      <Input v-model="brand" name="brand" label="Marca" required />
      <Input v-model="model" name="model" label="Modelo" required />
      <Input v-model="year" name="year" label="Ano" type="number" required />

      <div style="display: flex; justify-content: flex-end; gap: 16px; margin-top: 32px">
        <Button type="button" @click="emit('close')">Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Button from '@/components/button/Button.vue'
import Modal from '@/components/modal/Modal.vue'
import Input from '@/components/input/Input.vue'
import { vehicleService } from '@/services/vehicles'
import type { CreateVehicleDTO } from '@/types/vehicle'

interface Props {
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

watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      chassi.value = ''
      brand.value = ''
      model.value = ''
      year.value = null
    }
  },
)

const handleSubmit = async () => {
  try {
    const data: CreateVehicleDTO = {
      chassi: chassi.value.toUpperCase(),
      brand: brand.value,
      model: model.value,
      year: Number(year.value),
    }

    await vehicleService.create.execute(data)

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
  <Modal title="Cadastro de Veículo" :is-open="isOpen" @close="emit('close')">
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

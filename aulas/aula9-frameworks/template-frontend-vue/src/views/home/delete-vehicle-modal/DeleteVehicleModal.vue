<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/button/Button.vue'
import Modal from '@/components/modal/Modal.vue'
import { vehicleService } from '@/services/vehicles'
import type { Vehicle } from '@/types/vehicle'

interface Props {
  vehicle?: Vehicle | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'reload'): void
}>()

const handleConfirm = async () => {
  if (!props.vehicle) return
  try {
    await vehicleService.delete.execute(props.vehicle.id)
    emit('close')
    emit('reload')
  } catch (error: any) {
    alert(error?.message || 'Algo deu errado')
  }
}

const vehicleDescriptionPrefix = computed(() => {
  const v = props.vehicle
  return v ? 'o veículo' : 'este veículo'
})
const vehicleDescription = computed(() => {
  const v = props.vehicle
  return v ? ` ${v.chassi} (${v.brand} ${v.model} ${v.year})` : ''
})
</script>

<template>
  <Modal title="Excluir Veículo" :is-open="isOpen" @close="emit('close')">
    <p style="line-height: 1.4">
      Tem certeza de que deseja excluir {{ vehicleDescriptionPrefix
      }}<strong>{{ vehicleDescription }}</strong
      >? Essa ação não poderá ser desfeita.
    </p>

    <div style="display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px">
      <Button @click="emit('close')">Cancelar</Button>
      <Button @click="handleConfirm">Confirmar</Button>
    </div>
  </Modal>
</template>

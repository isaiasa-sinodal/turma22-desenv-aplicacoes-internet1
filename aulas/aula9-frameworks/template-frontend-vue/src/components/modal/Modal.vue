<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'

interface Props {
  title?: string
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

const openModal = () => {
  dialogRef.value?.showModal()
}

const closeModal = () => {
  dialogRef.value?.close()
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      openModal()
      dialogRef.value?.addEventListener('close', handleClose)
    } else {
      closeModal()
    }
  },
)

const handleClose = () => {
  emit('close')
}

onBeforeUnmount(() => {
  dialogRef.value?.removeEventListener('close', handleClose)
})
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <button class="close" @click="handleClose">X</button>

    <h2 v-if="title" class="title">{{ title }}</h2>

    <slot />
  </dialog>
</template>

<style scoped>
.modal {
  margin: auto;
  width: 90%;
  max-width: 600px;
  padding: 24px;
  border-radius: 4px;
  border-width: 1px;
  position: relative;
}

.modal::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.close {
  all: unset;
  user-select: none;
  position: absolute;
  right: 24px;
}

.title {
  margin-right: 24px;
  margin-bottom: 16px;
}
</style>

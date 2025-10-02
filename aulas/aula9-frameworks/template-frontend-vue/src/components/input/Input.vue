<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  type?: string
  modelValue?: string | number | null
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const labelText = computed(() => props.label + (props.required ? '*' : ''))

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="inputContainer">
    <label :for="name">{{ labelText }}</label>
    <input
      :id="name"
      :name="name"
      :type="type"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.inputContainer {
  margin-block: 16px;
}

.inputContainer label {
  display: block;
  margin-bottom: 6px;
}

.inputContainer input {
  width: 100%;
  padding: 6px 10px;
  font-size: 16px;
  border-radius: 4px;
  border-width: 1px;
}
</style>

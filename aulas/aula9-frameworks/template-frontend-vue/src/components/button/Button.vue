<script setup lang="ts">
import { computed, useAttrs } from 'vue'

type ButtonSize = 'sm' | 'lg'

interface Props {
  size?: ButtonSize
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
})

const attrs = useAttrs()

const classes = computed(() => ['button', props.class, props.size])
</script>

<template>
  <button v-bind="attrs" :class="classes">
    <slot />
  </button>
</template>

<style scoped>
.button {
  border-width: 1px;
  transition: filter 0.2s;
  user-select: none;
}

.button:hover {
  filter: brightness(0.9);
}

.button.sm {
  padding: 4px 6px;
  font-size: 14px;
  border-radius: 4px;
}

.button.lg {
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
}
</style>

<template>
  <form @submit.prevent="submitForm" class="form-container">
    <h3>{{ isEditing ? 'Editar Jogo' : 'Novo Jogo' }}</h3>
    <div class="input-group">
      <label for="titulo">Título:</label>
      <input id="titulo" v-model="formGame.titulo" required />
    </div>
    <div class="input-group">
      <label for="desenvolvedor">Desenvolvedor (Empresa):</label>
      <input id="desenvolvedor" v-model="formGame.desenvolvedor" required />
    </div>
    <div class="input-group">
      <label for="dataLancamento">Data de Lançamento:</label>
      <input id="dataLancamento" type="date" v-model="formGame.dataLancamento" required />
    </div>
    <div class="input-group">
      <label for="genero">Gênero:</label>
      <input id="genero" v-model="formGame.genero" required />
    </div>
    <div class="input-group">
      <label for="plataforma">Plataforma:</label>
      <input id="plataforma" v-model="formGame.plataforma" required />
    </div>
    <div class="actions">
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Salvando...' : 'Salvar Jogo' }}
      </button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { Game, NewGame } from '@/types/game';

const props = defineProps<{
  initialGame: Game | null;
  isLoading: boolean;
}>();

const emit = defineEmits(['submit', 'cancel']);

const formGame = ref<Game | NewGame>({
  titulo: '',
  desenvolvedor: '',
  dataLancamento: '',
  genero: '',
  plataforma: '',
});

const isEditing = computed(() => !!props.initialGame);

watch(() => props.initialGame, (newVal) => {
  if (newVal) {
    formGame.value = { ...newVal };
  } else {
    formGame.value = {
      titulo: '',
      desenvolvedor: '',
      dataLancamento: '',
      genero: '',
      plataforma: '',
    };
  }
}, { immediate: true });

function submitForm() {
  emit('submit', formGame.value);
}
</script>

<style scoped>
.form-container {
  padding: 20px;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
}
.input-group {
  margin-bottom: 15px;
}
.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}
.input-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.actions button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.actions button[type="submit"] {
  background-color: #42b983;
  color: white;
}
.actions button[type="button"] {
  background-color: #ccc;
  color: #333;
}
.actions button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
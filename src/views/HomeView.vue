<template>
  <div class="home-container">
    <h1>Catálogo de Jogos (CRUD Vue)</h1>
    <button @click="openCreateModal" class="add-button">
      + Adicionar Novo Jogo
    </button>
    <div class="games-list">
      <p v-if="isLoadingGames">Carregando jogos...</p>
      <p v-else-if="games.length === 0">Nenhum jogo encontrado. Adicione o primeiro!</p>
      <div v-else class="game-card-container">
        <div v-for="game in games" :key="game.id" class="game-card">
          <div class="game-info">
            <h2>{{ game.titulo }}</h2>
            <p><strong>Desenvolvedor:</strong> {{ game.desenvolvedor }}</p>
            <p><strong>Lançamento:</strong> {{ formatDate(game.dataLancamento) }}</p>
            <p><strong>Gênero:</strong> {{ game.genero }}</p>
            <p><strong>Plataforma:</strong> {{ game.plataforma }}</p>
          </div>
          <div class="card-actions">
            <button @click="openEditModal(game)" class="edit-button">Editar</button>
            <button @click="openDeleteModal(game)" class="delete-button">Excluir</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showCreateOrEditModal" class="modal-overlay">
      <div class="modal-content">
        <GameForm
          :initialGame="currentEditingGame"
          :isLoading="isSaving"
          @submit="handleFormSubmit"
          @cancel="closeModal"
        />
      </div>
    </div>
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content delete-modal">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir o jogo <strong>{{ currentDeletingGame?.titulo }}</strong>?</p>
        <div class="actions">
          <button @click="handleDelete" :disabled="isSaving" class="delete-button-confirm">
            {{ isSaving ? 'Excluindo...' : 'Sim, Excluir' }}
          </button>
          <button @click="closeModal" :disabled="isSaving" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Game, NewGame } from '@/types/game';
import * as GameService from '@/services/games';
import GameForm from '@/components/GameForm.vue';

const games = ref<Game[]>([]);
const isLoadingGames = ref(false);
const isSaving = ref(false);

const showCreateOrEditModal = ref(false);
const showDeleteModal = ref(false);
const currentEditingGame = ref<Game | null>(null);
const currentDeletingGame = ref<Game | null>(null);

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

async function fetchGames() {
  isLoadingGames.value = true;
  try {
    games.value = await GameService.getAllGames();
  } catch (error) {
    alert('Erro ao carregar os jogos.');
    console.error(error);
  } finally {
    isLoadingGames.value = false;
  }
}

onMounted(fetchGames);

function closeModal() {
  showCreateOrEditModal.value = false;
  showDeleteModal.value = false;
  currentEditingGame.value = null;
  currentDeletingGame.value = null;
}

function openCreateModal() {
  currentEditingGame.value = null;
  showCreateOrEditModal.value = true;
}

function openEditModal(game: Game) {
  currentEditingGame.value = game;
  showCreateOrEditModal.value = true;
}

function openDeleteModal(game: Game) {
  currentDeletingGame.value = game;
  showDeleteModal.value = true;
}

async function handleFormSubmit(gameData: Game | NewGame) {
  isSaving.value = true;
  try {
    if ('id' in gameData) {
      await GameService.updateGame(gameData as Game);
      alert('Jogo atualizado com sucesso!');
    } else {
      await GameService.createGame(gameData as NewGame);
      alert('Jogo criado com sucesso!');
    }
    closeModal();
    await fetchGames();
  } catch (error) {
    alert('Erro ao salvar o jogo. Verifique o console.');
    console.error(error);
  } finally {
    isSaving.value = false;
  }
}

async function handleDelete() {
  if (!currentDeletingGame.value) return;
  isSaving.value = true;
  try {
    await GameService.deleteGame(currentDeletingGame.value.id);
    alert(`Jogo "${currentDeletingGame.value.titulo}" excluído com sucesso!`);
    closeModal();
    await fetchGames();
  } catch (error) {
    alert('Erro ao excluir o jogo. Verifique o console.');
    console.error(error);
  } finally {
    isSaving.value = false;
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: sans-serif;
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
.add-button {
  background-color: #42b983;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s;
  margin-bottom: 20px;
}
.add-button:hover {
  background-color: #369c73;
}
.games-list {
  margin-top: 20px;
}
.game-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.game-card {
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.game-info h2 {
  color: #2c3e50;
  font-size: 1.4em;
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 10px;
}
.game-info p {
  margin: 5px 0;
  font-size: 0.95em;
}
.game-info strong {
  color: #34495e;
}
.card-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}
.card-actions button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}
.edit-button {
  background-color: #3498db;
  color: white;
}
.delete-button {
  background-color: #e74c3c;
  color: white;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.delete-modal {
  max-width: 350px;
  text-align: center;
}
.delete-modal h3 {
  color: #e74c3c;
}
.delete-modal .actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.delete-button-confirm {
  background-color: #e74c3c;
  color: white;
}
.cancel-button {
  background-color: #ccc;
  color: #333;
}
</style>
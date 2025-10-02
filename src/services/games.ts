import { Game, NewGame } from '@/types/game';

// Simulação de Banco de Dados em memória
const initialGames: Game[] = [
  { id: 1, titulo: 'Cyberpunk 2077', desenvolvedor: 'CD Projekt RED', dataLancamento: '2020-12-10', genero: 'RPG de Ação', plataforma: 'PC, Console' },
  { id: 2, titulo: 'The Witcher 3: Wild Hunt', desenvolvedor: 'CD Projekt RED', dataLancamento: '2015-05-19', genero: 'RPG', plataforma: 'PC, Console' },
  { id: 3, titulo: 'Stardew Valley', desenvolvedor: 'ConcernedApe', dataLancamento: '2016-02-26', genero: 'Simulação, RPG', plataforma: 'PC, Console, Mobile' },
];

let gamesDb: Game[] = initialGames;
let nextId = 4;

// Função para simular a demora de uma requisição de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Funções CRUD ---

export async function getAllGames(): Promise<Game[]> {
  await delay(500); // Simula latência de rede
  return gamesDb;
}

export async function createGame(newGame: NewGame): Promise<Game> {
  await delay(500);
  const game = { ...newGame, id: nextId++ };
  gamesDb.push(game);
  return game;
}

export async function updateGame(updatedGame: Game): Promise<Game> {
  await delay(500);
  const index = gamesDb.findIndex(g => g.id === updatedGame.id);
  if (index === -1) {
    throw new Error('Jogo não encontrado para atualização.');
  }
  gamesDb[index] = updatedGame;
  return updatedGame;
}

export async function deleteGame(id: number): Promise<void> {
  await delay(500);
  const initialLength = gamesDb.length;
  gamesDb = gamesDb.filter(g => g.id !== id);
  if (gamesDb.length === initialLength) {
    throw new Error('Jogo não encontrado para exclusão.');
  }
}
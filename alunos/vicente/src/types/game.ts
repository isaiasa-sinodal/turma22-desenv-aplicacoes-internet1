export interface Game {
  id: number;
  titulo: string;
  desenvolvedor: string;
  dataLancamento: string;
  genero: string;
  plataforma: string;
}

export type NewGame = Omit<Game, 'id'>;

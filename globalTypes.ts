export interface IPokemon {
  name: string;
  image: string;
  type: string;
  attack: number;
  defense: number;
  hp: number;
  idAuthor: number;
}

export interface IPokemonId extends IPokemon {
  id: number;
}

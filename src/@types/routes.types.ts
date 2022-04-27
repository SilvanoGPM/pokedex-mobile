import { Pokemon } from 'src/api/pokemons';

export type RootStackParamList = {
  Home: undefined;
  ViewPokemon: { pokemon: Pokemon };
};

export type RootDrawerParamList = {
  Explore: undefined;
  Search: undefined;
};

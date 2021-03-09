import { DefaultTheme } from "styled-components";
import { Pokemon } from "./pokemon.types";

export interface State {
  pokemonList: Pokemon[];
  cartItems: Pokemon[];
  cartOpen: boolean;
  theme: DefaultTheme;
  type: string;
  isLoading: boolean;
}

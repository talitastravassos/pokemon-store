import axios from "axios";
import React from "react";
import { initialPokemon, Pokemon } from "../types/pokemon.types";

interface State {
  pokemonList: Pokemon[];
}

interface IContext {
  state: State;
  action: {
    getPokemons(): void;
  };
}

const URL_API = "https://pokeapi.co/api/v2/pokemon/";

export const PokemonContext = React.createContext({} as IContext);

export default class PokemonProvider extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonList: [initialPokemon],
    };
  }

  getPokemons = async () => {
    try {
      const response = await axios.get(URL_API);
      console.log(response);
      this.setState({ pokemonList: response.data.results });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getPokemons();
  }

  render() {
    const value = {
      state: { ...this.state },
      action: {
        getPokemons: this.getPokemons,
      },
    };

    return <PokemonContext.Provider value={value} {...this.props} />;
  }
}

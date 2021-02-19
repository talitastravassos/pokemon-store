import axios from "axios";
import React from "react";
import { Pokemon } from "../types/pokemon.types";

interface State {
  pokemonList: Pokemon[];
  isLoading: boolean;
  nextPage: string;
}

interface IContext {
  state: State;
  action: {
    getPokemons(url: string): void;
  };
}

const URL_API = "https://pokeapi.co/api/v2/pokemon/";

export const PokemonContext = React.createContext({} as IContext);

export default class PokemonProvider extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonList: [] as Pokemon[],
      isLoading: false,
      nextPage: "",
    };
  }

  getPokemons = async (url: string) => {
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(url);
      console.log(response);

      const data = response.data.results.map((item: Pokemon) => {
        item.image = this.getImage(item.url);
        item.price = Number((Math.random() * 100).toFixed(2));

        return item;
      });

      this.setState({
        ...this.state,
        pokemonList: [...this.state.pokemonList, ...data],
        nextPage: response.data.next,
      });
      this.setState({ isLoading: false });
    } catch (error) {
      console.error(error);
    }
  };

  getImage = (link: string) => {
    const url = "https://www.serebii.net/art/th/";

    const id = link
      .substring(0, link.length - 1)
      .slice(link.substring(0, link.length - 1).lastIndexOf("/") + 1);

    return url + id + ".png";
  };

  componentDidMount() {
    this.getPokemons(URL_API);
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

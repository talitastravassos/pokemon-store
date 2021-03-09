import React from "react";
import { DefaultTheme } from "styled-components";
import { modalNotification } from "../services/notifications";
import {
  getRequestPokemon,
  removeFromCart,
  updateCart,
} from "../services/stateService";
import blue from "../styles/themes/blue";
import { Pokemon } from "../types/pokemon.types";
import { State } from "../types/state.types";

interface IContext {
  state: State;
  action: {
    getPokemons(url: string, type?: string, name?: string): void;
    addToCart(clickedItem: Pokemon): void;
    RemoveFromCart(url: string): void;
    setCartItemsOnLocalStorage(cartItems: Pokemon[]): void;
    getCartItemsFromLocalStorage(): void;
    checkout(total: number): void;
    openCloseCart(isOpen: boolean): void;
    setThemeOnLocalStorage(theme: DefaultTheme): void;
    getThemeFromLocalStorage(): DefaultTheme;
  };
}

export const URL_API = "https://pokeapi.co/api/v2/";

export const PokemonStoreContext = React.createContext({} as IContext);

export default class PokemonStoreProvider extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonList: [] as Pokemon[],
      cartItems: [] as Pokemon[],
      cartOpen: false,
      theme: this.getThemeFromLocalStorage(),
      type: "water",
      isLoading: false,
    };
  }

  getPokemons = async (
    url: string = URL_API,
    type: string = "water",
    name?: string
  ) => {
    this.setState({ isLoading: true });

    try {
      this.setState({
        ...this.state,
        pokemonList: await getRequestPokemon(url, type, name),
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  addToCart = (clickedItem: Pokemon) => {
    this.setState((state) => updateCart(state, clickedItem));
  };

  RemoveFromCart = (url: string) => {
    this.setState((state) => removeFromCart(state, url));
  };

  setCartItemsOnLocalStorage = (cartItems: Pokemon[]) => {
    localStorage.setItem("currentCart", JSON.stringify(cartItems));
  };

  getCartItemsFromLocalStorage = () => {
    const items = localStorage.getItem("currentCart");

    this.setState({
      cartItems: items ? JSON.parse(items) : ([] as Pokemon[]),
    });
  };

  setThemeOnLocalStorage = (theme: DefaultTheme) => {
    localStorage.setItem("currentTheme", JSON.stringify(theme));
    this.setState({
      theme,
    });

    this.getPokemons(URL_API, theme.title === "blue" ? "water" : "fire");
  };

  getThemeFromLocalStorage = (): DefaultTheme => {
    const theme = localStorage.getItem("currentTheme");

    return theme ? JSON.parse(theme) : blue;
  };

  checkout = (total: number) => {
    localStorage.removeItem("currentCart");
    this.getCartItemsFromLocalStorage();
    this.openCloseCart(false);
    modalNotification(
      `Obrigado por finalizar a sua compra no valor de R$ ${total.toFixed(2)}!`,
      "success"
    );
  };

  openCloseCart = (isOpen: boolean) => this.setState({ cartOpen: isOpen });

  getImage = (link: string) => {
    const url = "https://www.serebii.net/art/th/";

    const id = link
      .substring(0, link.length - 1)
      .slice(link.substring(0, link.length - 1).lastIndexOf("/") + 1);

    return url + id + ".png";
  };

  componentDidMount() {
    this.getPokemons(
      URL_API,
      this.state.theme.title === "blue" ? "water" : "fire"
    );
    this.getCartItemsFromLocalStorage();
  }

  render() {
    const value = {
      state: { ...this.state },
      action: {
        getPokemons: this.getPokemons,
        addToCart: this.addToCart,
        RemoveFromCart: this.RemoveFromCart,
        setCartItemsOnLocalStorage: this.setCartItemsOnLocalStorage,
        getCartItemsFromLocalStorage: this.getCartItemsFromLocalStorage,
        checkout: this.checkout,
        openCloseCart: this.openCloseCart,
        setThemeOnLocalStorage: this.setThemeOnLocalStorage,
        getThemeFromLocalStorage: this.getThemeFromLocalStorage,
      },
    };

    return <PokemonStoreContext.Provider value={value} {...this.props} />;
  }
}

import axios from "axios";
import React from "react";
import { DefaultTheme } from "styled-components";
import { modalNotification } from "../services/notifications";
import blue from "../styles/themes/blue";
import { Pokemon } from "../types/pokemon.types";
interface State {
  pokemonList: Pokemon[];
  cartItems: Pokemon[];
  cartOpen: boolean;
  theme: DefaultTheme;
  type: string;
  isLoading: boolean;
}

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

    let data: Pokemon[];
    try {
      const response = await axios.get(
        name ? `${url}pokemon/${name}` : `${url}type/${type}`
      );
      // console.log(response);

      if (!name) {
        data = response.data.pokemon.map((item: Pokemon) => {
          item = item.pokemon;
          item.image = this.getImage(item.url);
          item.price = Number((Math.random() * 100).toFixed(2));

          return item;
        });
      } else {
        data = [
          {
            name: response.data.name,
            url: url + name,
            image: this.getImage(URL_API + response.data.id + "/"),
            price: Number((Math.random() * 100).toFixed(2)),
          },
        ] as Pokemon[];
      }

      this.setState({
        ...this.state,
        pokemonList: data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  addToCart = (clickedItem: Pokemon) => {
    this.setState((state) => {
      const isItemInCart = state.cartItems.find(
        (item) => item.url === clickedItem.url
      );

      if (isItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.url === clickedItem.url
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...clickedItem, amount: 1 }],
      };
    });
  };

  RemoveFromCart = (url: string) => {
    this.setState((state) => {
      return {
        ...state,
        cartItems: state.cartItems.reduce((ack, item) => {
          if (item.url === url) {
            if (item.amount === 1) return ack;
            return [...ack, { ...item, amount: item.amount - 1 }];
          } else {
            return [...ack, item];
          }
        }, [] as Pokemon[]),
      };
    });
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

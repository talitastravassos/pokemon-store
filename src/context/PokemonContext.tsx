import axios from "axios";
import React from "react";
import { modalNotification } from "../services/notifications";
import { Pokemon } from "../types/pokemon.types";
interface State {
  pokemonList: Pokemon[];
  cartItems: Pokemon[];
  cartOpen: boolean;
  nextPage: string;
}

interface IContext {
  state: State;
  action: {
    getPokemons(url: string, name?: string): void;
    addToCart(clickedItem: Pokemon): void;
    RemoveFromCart(url: string): void;
    setCartItemsOnLocalStorage(cartItems: Pokemon[]): void;
    getCartItemsFromLocalStorage(): void;
    checkout(total: number): void;
    openCloseCart(isOpen: boolean): void;
  };
}

export const URL_API = "https://pokeapi.co/api/v2/pokemon/";

export const PokemonContext = React.createContext({} as IContext);

export default class PokemonProvider extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      pokemonList: [] as Pokemon[],
      cartItems: [] as Pokemon[],
      cartOpen: false,
      nextPage: "",
    };
  }

  getPokemons = async (url: string = URL_API, name?: string) => {
    let data: Pokemon[];
    try {
      const response = await axios.get(name ? url + name : url);
      console.log(response);

      if (!name) {
        data = response.data.results.map((item: Pokemon) => {
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
        pokemonList: !name ? [...this.state.pokemonList, ...data] : data,
        nextPage: response.data.next ? response.data.next : this.state.nextPage,
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
    this.getPokemons(URL_API);
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
      },
    };

    return <PokemonContext.Provider value={value} {...this.props} />;
  }
}

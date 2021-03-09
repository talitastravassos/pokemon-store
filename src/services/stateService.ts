import axios from "axios";
import { Pokemon } from "../types/pokemon.types";
import { State } from "./../types/state.types";

export const URL_API = "https://pokeapi.co/api/v2/";

export const updateCart = (state: State, clickedItem: Pokemon) => {
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
};

export const removeFromCart = (state: State, url: string) => {
  return {
    ...state,
    cartItems: state.cartItems.reduce((accumulator, item) => {
      if (item.url === url) {
        if (item.amount === 1) return accumulator;
        return [...accumulator, { ...item, amount: item.amount - 1 }];
      } else {
        return [...accumulator, item];
      }
    }, [] as Pokemon[]),
  };
};

export const getRequestPokemon = async (
  url: string = URL_API,
  type: string = "water",
  name?: string
): Promise<Pokemon[]> => {
  const response = await axios.get(
    name ? `${url}pokemon/${name}` : `${url}type/${type}`
  );
  // console.log(response);

  if (!name) {
    return response.data.pokemon.map((item: Pokemon) => {
      item = item.pokemon;
      item.image = getImage(item.url);
      item.price = Number((Math.random() * 100).toFixed(2));

      return item;
    });
  } else {
    return [
      {
        name: response.data.name,
        url: url + name,
        image: getImage(URL_API + response.data.id + "/"),
        price: Number((Math.random() * 100).toFixed(2)),
      },
    ] as Pokemon[];
  }
};

export const getImage = (link: string) => {
  const url = "https://www.serebii.net/art/th/";

  const id = link
    .substring(0, link.length - 1)
    .slice(link.substring(0, link.length - 1).lastIndexOf("/") + 1);

  return url + id + ".png";
};

import axios from "axios";
import blue from "../../styles/themes/blue";
import { Pokemon } from "../../types/pokemon.types";
import {
  getRequestPokemon,
  removeFromCart,
  updateCart,
  URL_API,
} from "../stateService";

jest.mock("axios");

describe("addToCart", () => {
  it("should add item to cart", () => {
    const item = {
      amount: 1,
      image: "https://www.serebii.net/art/th/5.png",
      name: "charmeleon",
      price: 58.4,
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    } as Pokemon;

    const state = {
      pokemonList: [item],
      cartItems: [],
      cartOpen: false,
      theme: blue,
      type: "water",
      isLoading: false,
    };

    const updateState = updateCart(state, item);

    expect(updateState).not.toBeNull();
    expect(updateState.cartItems.length).toBe(1);
    expect(updateState.cartItems).toStrictEqual([item]);
  });
});

describe("removeFromCart", () => {
  it("should remove item from cart", () => {
    const item = {
      amount: 1,
      image: "https://www.serebii.net/art/th/5.png",
      name: "charmeleon",
      price: 58.4,
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    } as Pokemon;

    const state = {
      pokemonList: [item],
      cartItems: [item],
      cartOpen: false,
      theme: blue,
      type: "water",
      isLoading: false,
    };

    const removeItem = removeFromCart(
      state,
      "https://pokeapi.co/api/v2/pokemon/5/"
    );

    expect(removeItem.cartItems).toStrictEqual([]);
  });

  it("should remove item from amount", () => {
    const item = {
      amount: 4,
      image: "https://www.serebii.net/art/th/5.png",
      name: "charmeleon",
      price: 58.4,
      url: "https://pokeapi.co/api/v2/pokemon/5/",
    } as Pokemon;

    const state = {
      pokemonList: [item],
      cartItems: [item],
      cartOpen: false,
      theme: blue,
      type: "water",
      isLoading: false,
    };

    const removeItem = removeFromCart(
      state,
      "https://pokeapi.co/api/v2/pokemon/5/"
    );

    expect(removeItem.cartItems[0].amount).toBe(3);
  });
});

describe("getRequestPokemon", () => {
  it("get pokemon list successfully from an API", async () => {
    const data = {
      data: {
        pokemon: [
          {
            pokemon: {
              name: "charizard",
              url: "https://pokeapi.co/api/v2/pokemon/6/",
            },
          },
          {
            pokemon: {
              name: "butterfree",
              url: "https://pokeapi.co/api/v2/pokemon/12/",
            },
          },
        ],
      },
    };
    //@ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const getPokemon = getRequestPokemon(URL_API, "fire").then((response) => {
      expect(getPokemon).not.toBeNull();
      expect(getPokemon).toStrictEqual([
        {
          name: "charizard",
          url: "https://pokeapi.co/api/v2/pokemon/6/",
        },
        {
          name: "butterfree",
          url: "https://pokeapi.co/api/v2/pokemon/12/",
        },
      ]);
    });
  });
});

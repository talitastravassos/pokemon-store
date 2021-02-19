import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import React from "react";
import "./App.scss";
import { ReloadButtonWrapper, Wrapper } from "./App.styles";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import PokemonItem from "./components/PokemonItem";
import { PokemonContext } from "./context/PokemonContext";
import { Pokemon } from "./types/pokemon.types";

function App() {
  const {
    action: { getPokemons },
    state: { pokemonList, nextPage },
  } = React.useContext(PokemonContext);

  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([] as Pokemon[]);

  React.useEffect(() => {
    console.log(pokemonList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonList]);

  const handleAddToCart = (clickedItem: Pokemon) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.url === clickedItem.url);

      if (isItemInCart) {
        return prev.map((item) =>
          item.url === clickedItem.url
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (url: string) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.url === url) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as Pokemon[])
    );
  };

  return (
    <>
      <Navbar cartItems={cartItems} setCartOpen={setCartOpen} />
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>

        <Grid container spacing={3}>
          {pokemonList?.map((item, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <PokemonItem item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>

        <ReloadButtonWrapper>
          <button onClick={() => getPokemons(nextPage)}>Mais Pokemón</button>
        </ReloadButtonWrapper>
      </Wrapper>
    </>
  );
}

export default App;

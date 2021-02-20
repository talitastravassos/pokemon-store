import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import React from "react";
import "./App.scss";
import { CenterButtonWrapper, Wrapper } from "./App.styles";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import PokemonItem from "./components/PokemonItem";
import { PokemonContext } from "./context/PokemonContext";

function App() {
  const {
    action: {
      getPokemons,
      setCartItemsOnLocalStorage,
      addToCart,
      RemoveFromCart,
      openCloseCart,
    },
    state: { pokemonList, nextPage, cartItems, cartOpen },
  } = React.useContext(PokemonContext);

  React.useEffect(() => {
    setCartItemsOnLocalStorage(cartItems);
  }, [cartItems, setCartItemsOnLocalStorage]);

  return (
    <>
      <Navbar cartItems={cartItems} setCartOpen={openCloseCart} />
      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => openCloseCart(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={RemoveFromCart}
          />
        </Drawer>

        <Grid container spacing={3}>
          {pokemonList?.map((item, index) => (
            <Grid item key={index} xs={12} sm={4}>
              <PokemonItem item={item} handleAddToCart={addToCart} />
            </Grid>
          ))}
        </Grid>

        <CenterButtonWrapper>
          <Button onClick={() => getPokemons(nextPage)} color="secondary">
            Mais Pokémon
          </Button>
        </CenterButtonWrapper>
      </Wrapper>
    </>
  );
}

export default App;

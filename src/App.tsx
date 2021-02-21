import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { ThemeProvider } from "styled-components";
import { CenterButtonWrapper, Wrapper } from "./App.styles";
import Cart from "./components/Cart";
import { Header } from "./components/Header";
import PokemonItem from "./components/PokemonItem";
import { PokemonStoreContext } from "./context/PokemonStoreContext";
import GlobalStyle from "./styles/global";
import blue from "./styles/themes/blue";
import red from "./styles/themes/red";

function App() {
  const {
    action: {
      getPokemons,
      setCartItemsOnLocalStorage,
      addToCart,
      RemoveFromCart,
      openCloseCart,
      setThemeOnLocalStorage,
    },
    state: { pokemonList, nextPage, cartItems, cartOpen, theme },
  } = React.useContext(PokemonStoreContext);

  const toggleTheme = () =>
    setThemeOnLocalStorage(theme.title === "blue" ? red : blue);

  React.useEffect(() => {
    setCartItemsOnLocalStorage(cartItems);
  }, [cartItems, setCartItemsOnLocalStorage]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Header
        toggleTheme={toggleTheme}
        cartItems={cartItems}
        setCartOpen={openCloseCart}
      />

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
    </ThemeProvider>
  );
}

export default App;

import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { ClipLoader } from "react-spinners";
import { ThemeProvider } from "styled-components";
import { Wrapper } from "./App.styles";
import Cart from "./components/Cart";
import { Header } from "./components/Header";
import PokemonItem from "./components/PokemonItem";
import { PokemonStoreContext } from "./context/PokemonStoreContext";
import GlobalStyle from "./styles/global";
import blue from "./styles/themes/blue";
import red from "./styles/themes/red";

const App: React.FC = () => {
  const {
    action: {
      setCartItemsOnLocalStorage,
      addToCart,
      RemoveFromCart,
      openCloseCart,
      setThemeOnLocalStorage,
    },
    state: { pokemonList, cartItems, cartOpen, theme, isLoading },
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

        <Grid container spacing={3} justify={"center"}>
          <ClipLoader
            color={theme.colors.primary}
            loading={isLoading}
            size={150}
          />
          {!isLoading &&
            pokemonList?.map((item, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <PokemonItem item={item} handleAddToCart={addToCart} />
              </Grid>
            ))}
        </Grid>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;

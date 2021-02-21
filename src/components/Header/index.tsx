import Badge from "@material-ui/core/Badge";
import { grey } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { shade } from "polished";
import React, { useContext } from "react";
import Switch from "react-switch";
import { ThemeContext } from "styled-components";
import { Pokemon } from "../../types/pokemon.types";
import Search from "../Search";
import { Container } from "./styles";

interface Props {
  cartItems: Pokemon[];
  setCartOpen: (cartOpen: boolean) => void;
  toggleTheme(): void;
}

export const Header: React.FC<Props> = ({
  cartItems,
  setCartOpen,
  toggleTheme,
}) => {
  const { colors, title } = useContext(ThemeContext);

  const getTotalItems = (items: Pokemon[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  return (
    <Container>
      Pokémon Store
      <Search />
      <div>
        <IconButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon style={{ color: grey[300] }} />
          </Badge>
        </IconButton>
        <Switch
          onChange={toggleTheme}
          checked={title === "red"}
          height={20}
          width={50}
          handleDiameter={25}
          onColor={colors.secundary}
          offColor={shade(0.2, colors.primary)}
        />
      </div>
    </Container>
  );
};

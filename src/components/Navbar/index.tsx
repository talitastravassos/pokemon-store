import Badge from "@material-ui/core/Badge";
import { grey } from "@material-ui/core/colors";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React from "react";
import { CartButton } from "../../App.styles";
import { Pokemon } from "../../types/pokemon.types";
import { Wrapper } from "./styles";

type Props = {
  cartItems: Pokemon[];
  setCartOpen: (cartOpen: boolean) => void;
};

const Navbar: React.FC<Props> = ({ cartItems, setCartOpen }) => {
  const getTotalItems = (items: Pokemon[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  return (
    <Wrapper>
      <CartButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon style={{ color: grey[300] }} />
        </Badge>
      </CartButton>
    </Wrapper>
  );
};

export default Navbar;

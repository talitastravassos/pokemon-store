import { Pokemon } from "../../types/pokemon.types";
import CartItem from "../CartItem";
import { Wrapper } from "./styles";

type Props = {
  cartItems: Pokemon[];
  addToCart: (clickedItem: Pokemon) => void;
  removeFromCart: (id: string) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: Pokemon[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Seu carrinho</h2>
      {cartItems.length === 0 ? <p>O seu carrinho está vazio</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.url}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: R$ {calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;

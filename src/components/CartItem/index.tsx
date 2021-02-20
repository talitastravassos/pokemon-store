import { Pokemon } from "../../types/pokemon.types";
import { CartButtonWrapper, Wrapper } from "./styles";

type Props = {
  item: Pokemon;
  addToCart: (clickedItem: Pokemon) => void;
  removeFromCart: (id: string) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.name}</h3>
      <img src={item.image} alt={item.name} />

      <div className="information">
        <p>Preço: R$ {item.price}</p>
        <p>Total: R$ {(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <CartButtonWrapper onClick={() => removeFromCart(item.url)}>
          -
        </CartButtonWrapper>
        <p>{item.amount}</p>
        <CartButtonWrapper onClick={() => addToCart(item)}>+</CartButtonWrapper>
      </div>
    </div>
  </Wrapper>
);

export default CartItem;

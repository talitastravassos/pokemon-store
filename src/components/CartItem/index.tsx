import Button from "@material-ui/core/Button";
import { Pokemon } from "../../types/pokemon.types";
import { Wrapper } from "./styles";

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
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.url)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
  </Wrapper>
);

export default CartItem;

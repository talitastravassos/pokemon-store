import Button from "@material-ui/core/Button";
import { Pokemon } from "../../types/pokemon.types";
import { Wrapper } from "./styles";

type Props = {
  item: Pokemon;
  handleAddToCart: (clickedItem: Pokemon) => void;
};

const PokemonItem: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>R$ {item.price}</p>
      </div>
      <Button onClick={() => handleAddToCart(item)}>
        Adicionar ao carrinho
      </Button>
    </Wrapper>
  );
};

export default PokemonItem;

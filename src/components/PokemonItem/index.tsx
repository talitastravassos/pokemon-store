import Button from "@material-ui/core/Button";
import { Pokemon } from "../../types/pokemon.types";
import { Wrapper } from "./styles";

type Props = {
  item: Pokemon;
  handleAddToCart: (clickedItem: Pokemon) => void;
};

const PokemonItem: React.FC<Props> = ({ item, handleAddToCart }) => {
  const getImage = () => {
    if (item) {
      const url = "https://www.serebii.net/art/th/";

      const id = item.url
        .substring(0, item.url.length - 1)
        .slice(item.url.substring(0, item.url.length - 1).lastIndexOf("/") + 1);

      return url + id + ".png";
    }
  };

  return (
    <Wrapper>
      <img src={getImage()} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)}>
        Adicionar ao carrinho
      </Button>
    </Wrapper>
  );
};

export default PokemonItem;

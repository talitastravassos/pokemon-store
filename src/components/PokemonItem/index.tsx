import Button from "@material-ui/core/Button";
import React from "react";
import { Pokemon } from "../../types/pokemon.types";
import { Wrapper } from "./styles";

type Props = {
  item: Pokemon;
  handleAddToCart: (clickedItem: Pokemon) => void;
};

const PokemonItem: React.FC<Props> = ({ item, handleAddToCart }) => {
  const onError = () =>
    (item.image =
      "https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png");

  return (
    <Wrapper>
      <img src={item.image} alt={item.name} onError={() => onError()} />
      <div>
        <h3>{item.name}</h3>
        <p>R$ {item.price}</p>
      </div>
      <Button onClick={() => handleAddToCart(item)} color="secondary">
        Adicionar ao carrinho
      </Button>
    </Wrapper>
  );
};

export default PokemonItem;

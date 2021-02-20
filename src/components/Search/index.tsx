import React from "react";
import { PokemonContext, URL_API } from "../../context/PokemonContext";
import { Input, SearchButton, Wrapper } from "./styles";

const Search: React.FC = () => {
  const {
    action: { getPokemons },
  } = React.useContext(PokemonContext);

  const [state, setState] = React.useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setState(event.target.value);
  };

  return (
    <Wrapper>
      <Input value={state} onChange={handleChange} />
      <SearchButton
        variant="contained"
        onClick={() => getPokemons(URL_API, state)}
      >
        Pesquisar
      </SearchButton>
    </Wrapper>
  );
};

export default Search;

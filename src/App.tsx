import React from "react";
import "./App.scss";
import { PokemonContext } from "./context/PokemonContext";

function App() {
  const {
    // action: { getPokemons },
    state: { pokemonList },
  } = React.useContext(PokemonContext); // context api

  React.useEffect(() => {
    console.log(pokemonList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonList]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

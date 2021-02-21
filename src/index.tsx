import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PokemonStoreProvider from "./context/PokemonStoreContext";

ReactDOM.render(
  <PokemonStoreProvider>
    <App />
  </PokemonStoreProvider>,
  document.getElementById("root")
);

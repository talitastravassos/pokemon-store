import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PokemonStoreProvider from "./context/PokemonStoreContext";
import "./index.scss";

ReactDOM.render(
  <PokemonStoreProvider>
    <App />
  </PokemonStoreProvider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import PokemonProvider from "./context/PokemonContext";
import "./index.scss";

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);

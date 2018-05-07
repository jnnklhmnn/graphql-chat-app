import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import "./index.css";
import "./reset.css";

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI }),
  cache: new InMemoryCache()
});

const target = document.querySelector("#root");
const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<AppWithProvider />, target);

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://oumls.sse.codesandbox.io/api/demo",
    cache: new InMemoryCache()
});

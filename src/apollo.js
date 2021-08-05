import { InMemoryCache, ApolloClient } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://gqlserver.run.goorm.io",	// backend server (gql server playground)
	cache: new InMemoryCache()
});

export default client;
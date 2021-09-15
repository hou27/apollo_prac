# Apollo

Built with React, Apollo and Graphql  

```
goorm 실행 url, port
https://reactjs-prac-ldxqa.run.goorm.io:3000
https://gqlserver.run.goorm.io:4000
```

[styled-components](https://styled-components.com/)
[reactrouter](https://reactrouter.com/web/guides/quick-start)
[reactapollo](https://www.apollographql.com/docs/react/)

```
npm i styled-components react-router-dom

npm install @apollo/client graphql -- (apollo 3.4.3ver setting)
```

Reset CSS  
```
http://meyerweb.com/eric/tools/css/reset/ 
v2.0 | 20110126
License: none (public domain)
```

```
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});
```

https://javaexpert.tistory.com/1013

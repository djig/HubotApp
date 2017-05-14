
import { 
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
    addTypeName,
} from 'react-apollo';
// export const  networkInterface = createNetworkInterface({ 
//   uri: 'http://localhost:4000/graphql',
//   queryTransformer: addTypeName,
// });

// export const client = new ApolloClient({
//    networkInterface,
//  });

 const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:4000/graphql'),
  queryTransformer: addTypeName,
});
export default client;
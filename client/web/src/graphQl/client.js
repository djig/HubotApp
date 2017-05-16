
import { 
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
    addTypeName,
} from 'react-apollo';

 const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:4000/graphql'),
  queryTransformer: addTypeName,
});
export default client;
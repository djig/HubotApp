import {
  makeExecutableSchema,
} from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
scalar Date
type Sample {
   id: ID!                # "!" denotes a required field
    name: String
},
type Orgnization {
   id: ID!                # "!" denotes a required field
   company_name: String,
   homepage: String
},
type User {
   id: ID!                # "!" denotes a required field
   email: String,
   organization_id: String,
   first_name: String,
   last_name: String,
   roles: String,
   phone: String,
   user_name: String,
   acct_enabled: Int!,
   created_at: String,
   Orgnization: [Orgnization]
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   users(id: ID, name: String): [User]
}
# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addSample(name: String!): Sample
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
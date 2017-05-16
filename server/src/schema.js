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
},
enum category {
  Technology
  Science
  Sports
  Politics
  Other
},

enum rating {
    HateIt,
    LoveIt
    Average
    FuckYou
    Angry
},

type comment {
  _id:  ID!
  title: String
  text: String
  categories: [category]
  ratings: [rating]
  _rev: String
}

input commentInput {
  title: String
  text: String
  categories: [category]
  ratings: [rating]
}
input commentUpdateInput {
  _id:  ID!
  _rev: String
  title: String
  text: String
  categories: [category]
  ratings: [rating]
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   users(id: ID, name: String): [User]
   comments(id: ID, title: String): [comment]
}
# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addSample(name: String!): Sample
  addComment(input: commentInput): comment
  updateComment(input: commentUpdateInput): comment
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
export const typeDefs = `
type User {
   id: ID!                # "!" denotes a required field
   first_name: String
   last_name: String
   phone: String
   user_name: String
}
type Query {
   users(name: 'salmon'): [User]    # "[]" means this is a list of users
}
`;
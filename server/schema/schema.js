import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
  type UserType {
    id: ID
    email: String
  }
  type Query {
    currentUser: UserType
  }
  type Mutation {
    login(email: String, password: String): UserType
  }
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };

import { login, signup } from '../services/auth';

export const resolvers = {
  Query: {
    currentUser(_, req) {
      return req.user;
    },
  },
  Mutation: {
    login(_, { email, password }, req) {
      return login({ email, password, req });
    },
    signup(_, { email, password }, req) {
      return signup({ email, password, req });
    },
  },
};

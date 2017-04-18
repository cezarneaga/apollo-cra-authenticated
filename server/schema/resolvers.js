import * as AuthService from '../services/auth';

export const resolvers = {
  Query: {
    currentUser(_, req) {
      return req.user;
    },
  },
  Mutation: {
    login(root, { email, password }, req) {
      return AuthService.login({ email, password, req });
    },
  },
};

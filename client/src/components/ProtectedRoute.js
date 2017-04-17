import React from 'react';
import query from '../queries/currentUser';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';

export default ProtectedRoute => {
  const RequireAuth = props => {
    if (!props.data.loading && !props.data.currentUser) {
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      );
    } else {
      return <ProtectedRoute {...props} />;
    }
  };
  return graphql(query)(RequireAuth);
};

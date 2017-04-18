import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql',
});
const client = new ApolloClient({
  // dataIdFromObject: o => o.id,
  connectToDevTools: true,
  networkInterface,
});

const render = Component => {
  return ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    document.getElementById('root')
  );
};
render(Routes);
if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextRoutes = require('./routes').default;
    render(NextRoutes);
  });
}

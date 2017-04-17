import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import query from '../queries/currentUser';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';
import styled from 'styled-components';
import { Grid, Header, Icon, Card } from 'semantic-ui-react';

const FullGrid = styled(Grid)`
  min-height: 100vh
`;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [], loggedIn: false };
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.data.loading && nextProps.data.currentUser) {
      this.setState({ loggedIn: true });
    }
  }
  onSubmit({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Layout>
        <Helmet title="Login" />
        <FullGrid
          verticalAlign="middle"
          centered
          columns={2}
          stretched
          doubling>
          <Grid.Row>
            <Grid.Column>
              <Card fluid raised>
                <Card.Content>
                  <Header as="h2" icon textAlign="center">
                    <Icon name="user" circular />
                    <Header.Content>
                      Login
                    </Header.Content>
                  </Header>
                  <AuthForm
                    onSubmit={this.onSubmit.bind(this)}
                    errors={this.state.errors}
                    button={{ icon: 'unlock', label: 'Submit' }}
                  />
                </Card.Content>
                <Card.Content extra>
                  <Link to="/signup"><Icon name="user" />Signup</Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </FullGrid>
      </Layout>
    );
  }
}
export default graphql(query)(graphql(mutation)(Login));

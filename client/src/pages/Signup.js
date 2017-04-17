import React from 'react';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import query from '../queries/currentUser';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Grid, Header, Icon, Card } from 'semantic-ui-react';

const FullGrid = styled(Grid)`
  min-height: 100vh
`;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
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
    return (
      <Layout>
        <Helmet title="Signup" />
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
                      Signup
                    </Header.Content>
                  </Header>
                  <AuthForm
                    onSubmit={this.onSubmit.bind(this)}
                    errors={this.state.errors}
                    button={{ icon: 'user', label: 'Join' }}
                  />
                </Card.Content>
                <Card.Content extra>
                  <Link to="/login"><Icon name="unlock" />Login</Link>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </FullGrid>
      </Layout>
    );
  }
}
export default graphql(mutation)(Signup);

import React from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/currentUser';
import { Link } from 'react-router-dom';
import logout from '../mutations/Logout';
import { Menu, Grid } from 'semantic-ui-react';
import styled from 'styled-components';
const HeaderContainer = styled.div`
  height: 60px;
  margin: 15px 0;
`;
const Logout = styled.a`
  cursor: pointer;
`;
const Header = props => {
  const { currentUser, loading } = props.data;

  const renderButtons = () =>
    !currentUser
      ? <Menu.Menu position="right">
          <Menu.Item><Link to="/signup">Signup</Link></Menu.Item>
          <Menu.Item><Link to="/login">Login</Link></Menu.Item>
        </Menu.Menu>
      : <Menu.Menu position="right">
          <Menu.Item>{currentUser.email}</Menu.Item>
          <Menu.Item>
            <Logout
              onClick={() =>
                props.mutate({
                  refetchQueries: [{ query }],
                })}>
              Logout
            </Logout>
          </Menu.Item>
        </Menu.Menu>;
  return (
    <HeaderContainer>
      <Grid stretched verticalAlign="middle">
        <Grid.Row>
          <Grid.Column>
            <Menu>
              <Menu.Item>
                <Link to="/" className="brand-logo left">
                  Set project name
                </Link>
              </Menu.Item>
              {loading ? <div /> : renderButtons()}
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </HeaderContainer>
  );
};

export default graphql(logout)(graphql(query)(Header));

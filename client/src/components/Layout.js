import React from 'react';
import Header from '../components/Header';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
const FullContainer = styled(Container)`
  min-height: 100vh
`;
const Layout = props => (
  <FullContainer>
    {props.header ? <Header /> : null}{props.children}
  </FullContainer>
);
export default Layout;

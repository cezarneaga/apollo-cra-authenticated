import React from 'react';
import Layout from '../components/Layout';
import Intro from '../components/Intro';
import Helmet from 'react-helmet';
export default () => (
  <Layout header><Helmet title="Homepage" /><Intro /></Layout>
);

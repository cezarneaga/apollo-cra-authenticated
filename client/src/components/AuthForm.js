import React from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
const Errors = styled.div`
  color: #9F3A38;
`;
class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    const { email, password } = this.state;
    return (
      <Form onSubmit={this.onSubmit} size="massive">
        <Form.Input
          placeholder="Enter email"
          name="email"
          label="Your email"
          value={email}
          error={this.props.errors.length > 0}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <Form.Input
          placeholder="Enter password"
          name="password"
          label="Your password"
          value={password}
          error={this.props.errors.length > 0}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <Form.Button
          size="massive"
          icon={this.props.button.icon}
          content={this.props.button.label}
        />
        <Errors>
          {this.props.errors.map(error => <div key={error}>{error}</div>)}
        </Errors>
      </Form>
    );
  }
}
export default AuthForm;

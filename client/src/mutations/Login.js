import { gql } from 'react-apollo';
export default gql`
  mutation Login($email: String, $password: String){
    login(email:$email, password: $password){
      id
      email
    }
  }
`;

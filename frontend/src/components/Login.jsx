import Signup from './Signup';

const Login = ({ headerText, redirectURLPrefix }) => {
  return (
    <Signup
      headerText={headerText}
      isSignup={false}
      redirectURLPrefix={redirectURLPrefix}
    />
  );
};

export default Login;

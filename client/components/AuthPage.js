import { Flex } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import SignInForm from './SignInForm.js';
import SignUpForm from './SignUpForm.js';
import Header from './Header.js';
import styles from '../global.css';
import Loader from './Loader.js';

export default function AuthPage() {
  const { type: authMethod } = useParams();
  const { user, loading } = useUser();

  if (!loading && user) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Flex
          direction="column"
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h="calc(100vh)"
          alignItems="center"
        >
          {authMethod === 'sign-in' ? <SignInForm /> : <SignUpForm />}
        </Flex>
      )}
    </>
  );
}

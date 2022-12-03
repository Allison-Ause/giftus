import { Text, Flex } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import SignInForm from './SignInForm.js';
import SignUpForm from './SignUpForm.js';
import Header from './Header.js';

export default function AuthPage() {
  const { type: authMethod } = useParams();
  const { user, loading } = useUser();

  if (loading) return <Text>Loading...</Text>;
  if (!loading && user) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      <Flex>
        {authMethod === 'sign-in' ? <SignInForm /> : <SignUpForm />}
      </Flex>
    </>
  );
}

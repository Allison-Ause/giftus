import Header from './Header.js';
import Loader from './Loader.js';
import FriendForm from './FriendForm.js';
import { useUser } from '../context/userContext.js';
import { Flex } from '@chakra-ui/react';
import styles from '../global.css';
import { Navigate } from 'react-router-dom';

export default function FriendFormPage() {
  const { user, loading } = useUser();

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

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
          h={{ base: '100%vh', md: 'calc(100vh)' }}
          alignItems="center"
        >
          <FriendForm />
        </Flex>
      )}
    </>
  );
}

import { Box, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useFriends from '../hooks/useFriends.js';
import Header from './Header.js';
import Loader from './Loader.js';
import styles from '../global.css';

export default function FriendDetailPage() {
  const { user, loading } = useUser();
  const { id } = useParams();
  const { friend, friendLoading, setFriendLoading } = useFriends(
    id,
    user
  );
  console.log('friend:', friend);

  let birthday;
  let displayDate;

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;
  if (friend === null) return <Navigate to="/" />;

  function changeDate() {
    if (friend.birthday === '1920-08-18T08:00:00.000Z') {
      displayDate = '';
      setFriendLoading(false);
    } else {
      birthday = new Date(friend.birthday).toDateString();
      displayDate = birthday.split(' ').splice(1, 2).join(' ');
      setFriendLoading(false);
    }
  }

  return (
    <>
      <Header />
      {friendLoading ? (
        <Loader />
      ) : (
        <Flex
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h="calc(100vh)"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            boxShadow="md"
            p="6"
            rounded="lg"
            bg="#fff9ec"
            w="425px"
            h="600px"
          ></Box>
        </Flex>
      )}
    </>
  );
}

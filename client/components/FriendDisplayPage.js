import {
  Flex,
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Header from './Header.js';
import Loader from './Loader.js';
import styles from '../global.css';
import { useUser } from '../context/userContext.js';
import useFriends from '../hooks/useFriends.js';
import { Navigate } from 'react-router-dom';
import FriendTableRow from './FriendTableRow.js';
import Search from './Search.js';

export default function FriendDisplayPage() {
  const { user, loading } = useUser();
  const {
    friends,
    setFriends,
    searchFriends,
    friendSearchTerm,
    setFriendSearchTerm,
  } = useFriends();

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

  console.log('friends:', friends);
  let birthday;
  let displayDate;

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Flex
          direction="column"
          gap="50px"
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h="calc(100vh)"
          padding="30px"
          justifyContent="center"
          alignItems="center"
        >
          <Search
            friendSearchTerm={friendSearchTerm}
            setFriendSearchTerm={setFriendSearchTerm}
          />
          <Box
            boxShadow="md"
            p="6"
            rounded="lg"
            bg="#fff9ec"
            w="900px"
            h="500px"
            overflow="scroll"
          >
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <h1 className={styles.friend}>Future Recipients</h1>
              <TableContainer>
                <Table
                  variant="striped"
                  colorScheme="pink"
                  w="800px"
                  mt="50px"
                >
                  <Thead>
                    <Tr>
                      <Th>
                        <h1 className={styles.friendTableHead}>
                          Name
                        </h1>
                      </Th>
                      <Th>
                        <h1 className={styles.friendTableHead}>
                          Birthday
                        </h1>
                      </Th>
                      <Th>
                        <h1 className={styles.friendTableHead}>
                          Address
                        </h1>
                      </Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {searchFriends().map((friend) => {
                      if (
                        friend.birthday === '1920-08-18T08:00:00.000Z'
                      ) {
                        displayDate = '';
                      } else {
                        birthday = new Date(
                          friend.birthday
                        ).toDateString();
                        displayDate = birthday
                          .split(' ')
                          .splice(1, 2)
                          .join(' ');
                      }
                      return (
                        <FriendTableRow
                          key={friend.id}
                          friend={friend}
                          setFriends={setFriends}
                          displayDate={displayDate}
                        />
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

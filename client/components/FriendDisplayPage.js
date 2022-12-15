import {
  Flex,
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useMediaQuery,
  Text,
} from '@chakra-ui/react';
import Header from './Header.js';
import Loader from './Loader.js';
import styles from '../global.css';
import { useUser } from '../context/userContext.js';
import useFriends from '../hooks/useFriends.js';
import { Navigate } from 'react-router-dom';
import FriendTableRow from './FriendTableRow.js';
import Search from './Search.js';
import { searchItems } from '../services/general-utils.js';
import { useState } from 'react';

export default function FriendDisplayPage() {
  const { user, loading } = useUser();
  const { friends, setFriends } = useFriends();
  const [friendSearchTerm, setFriendSearchTerm] = useState('');
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

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
          gap={{ base: '10px', md: '50px' }}
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h={{ base: '100%vh', md: 'calc(100vh)' }}
          padding={{ base: '5px', md: '30px' }}
          justifyContent="center"
          alignItems="center"
        >
          <h1 className={styles.friendTableTitle}>
            Future Recipients
          </h1>
          <Search
            friendSearchTerm={friendSearchTerm}
            setFriendSearchTerm={setFriendSearchTerm}
          />
          <Box
            boxShadow="lg"
            p="6"
            rounded="lg"
            bg="#fff9ec"
            w={{ base: '400px', md: '900px' }}
            h="500px"
            overflow="scroll"
          >
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <TableContainer>
                {isMobile ? (
                  <Table
                    variant="striped"
                    colorScheme="pink"
                    w="350px"
                    mt="50px"
                  >
                    <Thead>
                      <Tr>
                        <Th>
                          <Flex
                            justifyContent="center"
                            pb="10px"
                            mt="-20px"
                          >
                            <Text fontSize="4xl">👤</Text>
                          </Flex>
                        </Th>
                        <Th>
                          <Flex
                            justifyContent="center"
                            pb="10px"
                            mt="-40px"
                          >
                            <Text fontSize="4xl">🎂</Text>
                          </Flex>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {searchItems(friends, friendSearchTerm).map(
                        (friend) => {
                          if (friend.birthday === null) {
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
                              isMobile={isMobile}
                            />
                          );
                        }
                      )}
                    </Tbody>
                  </Table>
                ) : (
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
                      {searchItems(friends, friendSearchTerm).map(
                        (friend) => {
                          if (friend.birthday === null) {
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
                        }
                      )}
                    </Tbody>
                  </Table>
                )}
              </TableContainer>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

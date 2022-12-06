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

export default function FriendDisplayPage() {
  // where all the friends will be displayed (with search functionality?)
  const { user, loading } = useUser();
  const { friends } = useFriends();

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
          gap="50px"
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h="calc(100vh)"
          padding="30px"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            boxShadow="md"
            p="6"
            rounded="lg"
            bg="#fff9ec"
            w="800px"
            h="500px"
            overflow="scroll"
          >
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <h1 className={styles.title}>Future Recipients</h1>
              <TableContainer>
                <Table
                  variant="striped"
                  colorScheme="pink"
                  w="700px"
                  mt="50px"
                >
                  <Thead>
                    <Tr>
                      <Th>
                        <h1 className={styles.tableHead}>Name</h1>
                      </Th>
                      <Th>
                        <h1 className={styles.tableHead}>Birthday</h1>
                      </Th>
                      <Th>
                        <h1 className={styles.tableHead}>Address</h1>
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {friends.map((friend) => {
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

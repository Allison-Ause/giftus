import {
  Flex,
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

export default function FriendDisplayPage() {
  // where all the friends will be displayed (with search functionality?)
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
                    {friends.map((friend) => (
                      <FriendTableRow
                        key={friend.id}
                        friend={friend}
                      />
                    ))}
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

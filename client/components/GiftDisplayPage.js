import {
  Box,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { useUser } from '../context/userContext.js';
import useGifts from '../hooks/useGifts.js';
import Header from './Header.js';
import styles from '../global.css';
import GiftTableRow from './GiftTableRow.js';

export default function GiftDisplayPage() {
  const { gifts } = useGifts();
  const { user, loading } = useUser();
  console.log('user:', user);
  console.log('gifts:', gifts);

  if (loading) return <div>Loading...</div>;
  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

  return (
    <>
      <Header />
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
        <h1 className={styles.title}>Cached Gifts</h1>
        <Box
          boxShadow="md"
          p="6"
          rounded="lg"
          bg="#fff9ec"
          w="800px"
          h="500px"
        >
          <TableContainer>
            <Table variant="striped" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th>
                    <h1 className={styles.tableHead}>Idea</h1>
                  </Th>
                  <Th>
                    <h1 className={styles.tableHead}>Recipient</h1>
                  </Th>
                  <Th>
                    <h1 className={styles.tableHead}>Price</h1>
                  </Th>
                  <Th>
                    <h1 className={styles.tableHead}>Occasion</h1>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {gifts.map((gift) => (
                  <GiftTableRow key={gift.id} gift={gift} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </>
  );
}

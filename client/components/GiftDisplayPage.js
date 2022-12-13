import {
  Box,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@chakra-ui/react';
import { useUser } from '../context/userContext.js';
import useGifts from '../hooks/useGifts.js';
import Header from './Header.js';
import styles from '../global.css';
import GiftTableRow from './GiftTableRow.js';
import { Navigate } from 'react-router-dom';
import Loader from './Loader.js';
import Search from './Search.js';

export default function GiftDisplayPage() {
  const { filterGifts, searchTerm, setSearchTerm } = useGifts();
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
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Box
            boxShadow="lg"
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
              <h1 className={styles.title}>Cached Gifts</h1>
              <TableContainer>
                <Table
                  variant="striped"
                  colorScheme="purple"
                  w="700px"
                  mt="50px"
                >
                  <Thead>
                    <Tr>
                      <Th>
                        <h1 className={styles.tableHead}>Idea</h1>
                      </Th>
                      <Th>
                        <h1 className={styles.tableHead}>
                          Recipient
                        </h1>
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
                    {filterGifts().map((gift) => (
                      <GiftTableRow key={gift.id} gift={gift} />
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

import {
  Box,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  useMediaQuery,
  Text,
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
  const [isMobile] = useMediaQuery('(max-width: 768px)');

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
          gap={{ base: '10px', md: '50px' }}
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h={{ base: '100%vh', md: 'calc(100vh)' }}
          padding={{ base: '5px', md: '30px' }}
          justifyContent="center"
          alignItems="center"
        >
          <h1 className={styles.tableTitle}>Stashed Gifts</h1>
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
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
                    colorScheme="purple"
                    w="350px"
                    mt="50px"
                  >
                    <Thead>
                      <Tr>
                        <Th>
                          <Flex
                            justifyContent="center"
                            pb="10px"
                            mt="-40px"
                            ml="-15px"
                          >
                            <Text fontSize="4xl">🎁</Text>
                          </Flex>
                        </Th>
                        <Th>
                          <Flex
                            justifyContent="center"
                            pb="10px"
                            mt="-40px"
                          >
                            <Text fontSize="4xl">👤</Text>
                          </Flex>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filterGifts().map((gift) => (
                        <GiftTableRow
                          key={gift.id}
                          gift={gift}
                          isMobile={isMobile}
                        />
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Table
                    variant="striped"
                    colorScheme="purple"
                    w="800px"
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
                          <h1 className={styles.tableHead}>
                            Occasion
                          </h1>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filterGifts().map((gift) => (
                        <GiftTableRow key={gift.id} gift={gift} />
                      ))}
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

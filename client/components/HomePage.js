import { Box, Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useGifts from '../hooks/useGifts.js';
import Gift from './Gift.js';
import NewGiftForm from './NewGiftForm.js';
import styles from '../global.css';

export default function HomePage() {
  const { gifts, setGifts } = useGifts();
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

  return (
    <>
      <Flex
        direction="row"
        gap="50px"
        className={styles.bg}
        backgroundPosition="bottom-left"
        backgroundSize="cover"
        h="calc(100vh)"
        padding="30px"
        justifyContent="space-around"
      >
        <Box
          boxShadow="md"
          p="6"
          rounded="lg"
          bg="#fff9ec"
          w="500px"
          h="600px"
        >
          <NewGiftForm setGifts={setGifts} />
        </Box>

        <Box
          boxShadow="md"
          p="6"
          rounded="lg"
          bg="#fff9ec"
          w="425px"
          h="600px"
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <h1 className={styles.title}>Recent Gift Ideas</h1>
            <div>
              {gifts.map((gift) => (
                <Gift key={gift.id} {...gift} setGifts={setGifts} />
              ))}
            </div>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

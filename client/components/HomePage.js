import { Box, Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useGifts from '../hooks/useGifts.js';
import Gift from './Gift.js';
import NewGiftForm from './NewGiftForm.js';
import styles from '../global.css';
import Header from './Header.js';
import Loader from './Loader.js';
import { useState } from 'react';

export default function HomePage() {
  const { gifts, setGifts } = useGifts();
  const { user, loading } = useUser();

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

  const fiveRecents = gifts.slice(0, 5);

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
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
          <NewGiftForm gift={{}} setGifts={setGifts} />
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
              <h1 className={styles.title}>Recently Cached:</h1>
              <div>
                {fiveRecents.map((gift) => (
                  <Gift key={gift.id} {...gift} setGifts={setGifts} />
                ))}
              </div>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

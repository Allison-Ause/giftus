import { Box, Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useGifts from '../hooks/useGifts.js';
import Gift from './Gift.js';
import NewGiftForm from './NewGiftForm.js';

export default function HomePage() {
  const { gifts, setGifts } = useGifts();
  const { user } = useUser();

  if (!user) return <Navigate to="/auth/sign-in" replace />;

  return (
    <>
      <Flex direction="row" gap="50px">
        <Box boxShadow="md" p="6" rounded="md" bg="white">
          <NewGiftForm setGifts={setGifts} />
        </Box>

        <Box boxShadow="md" p="6" rounded="md" bg="white">
          <h1>This is where the data is!</h1>
          <div>
            {gifts.map((gift) => (
              <Gift key={gift.id} {...gift} setGifts={setGifts} />
            ))}
          </div>
        </Box>
      </Flex>
    </>
  );
}

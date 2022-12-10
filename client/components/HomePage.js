import { Box, Flex, Stack, Text, Link } from '@chakra-ui/react';
import { Navigate, Link as RLink } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useGifts from '../hooks/useGifts.js';
import Gift from './Gift.js';
import NewGiftForm from './NewGiftForm.js';
import styles from '../global.css';
import Header from './Header.js';
import Loader from './Loader.js';
import {
  fourRecentGifts,
  formatDateMD,
  upcomingDates,
} from '../services/general-utils.js';
import useFriends from '../hooks/useFriends.js';

export default function HomePage() {
  const { gifts, setGifts } = useGifts();
  const { user, loading } = useUser();
  const { friends } = useFriends();

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

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
          alignItems="center"
          justifyContent="space-around"
        >
          <NewGiftForm gift={{}} setGifts={setGifts} />
          <Flex direction="column" gap="50px">
            <Box
              boxShadow="md"
              p="6"
              rounded="lg"
              bg="#fff9ec"
              w="425px"
              h="350px"
            >
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <h1 className={styles.title}>Recent Ideas</h1>
                <Stack spacing={1} mt="15px">
                  {fourRecentGifts(gifts).map((gift) => (
                    <Gift
                      key={gift.id}
                      gift={gift}
                      setGifts={setGifts}
                    />
                  ))}
                </Stack>
              </Flex>
            </Box>
            <Box
              boxShadow="md"
              p="6"
              rounded="lg"
              bg="#fff9ec"
              w="425px"
              h="350px"
            >
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <h1 className={styles.title}>Upcoming Events</h1>
                <Stack spacing={3} mt="20px">
                  {upcomingDates(friends)
                    .slice(0, 4)
                    .map((friend) => (
                      <Flex key={friend.id} direction="row" gap="5px">
                        <Text fontWeight="bold">{`${formatDateMD(
                          friend.birthday
                        )} -`}</Text>
                        <Text>
                          <Link
                            as={RLink}
                            to={`/friends/${friend.id}`}
                          >{`${friend.name}'s`}</Link>
                          {` Birthday`}
                        </Text>
                      </Flex>
                    ))}
                </Stack>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      )}
    </>
  );
}

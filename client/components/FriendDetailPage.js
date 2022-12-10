import {
  Box,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useFriends from '../hooks/useFriends.js';
import Header from './Header.js';
import Loader from './Loader.js';
import styles from '../global.css';
import { useState } from 'react';
import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import useGifts from '../hooks/useGifts.js';
import FriendForm from './FriendForm.js';
import { formatDateYMD } from '../services/general-utils.js';
import { Link as RLink } from 'react-router-dom';

export default function FriendDetailPage() {
  const { user, loading } = useUser();
  const { id } = useParams();
  const { friend, setFriend, friendLoading } = useFriends(id, user);
  const { friendFilter } = useGifts(id);
  const [isEditing, setIsEditing] = useState(false);

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;
  if (friend === null) return <Navigate to="/" />;

  // FOR PASSING TO DATE INPUT IN EDITING FORM
  let calendarDate;
  if (!friendLoading) {
    calendarDate = friend.birthday.slice(0, 10);
  }

  return (
    <>
      <Header />
      {friendLoading ? (
        <Loader />
      ) : (
        <Flex
          direction="row"
          gap="25px"
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h="calc(100vh)"
          justifyContent="space-around"
          alignItems="center"
        >
          {isEditing ? (
            <FriendForm
              friend={friend}
              setFriend={setFriend}
              calendarDate={calendarDate}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (
            <Box
              boxShadow="md"
              p="6"
              rounded="lg"
              bg="#fff9ec"
              h="400px"
              w="350px"
            >
              <Flex justifyContent="flex-end" m="-15px">
                <IconButton
                  aria-label="edit-gift"
                  size="md"
                  colorScheme="pink"
                  variant="ghost"
                  icon={<EditIcon />}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
              </Flex>
              <Flex
                direction="column"
                gap="10px"
                justifyContent="center"
                alignItems="center"
              >
                <h1 className={styles.friend} id={styles.drop}>
                  Your Friend
                </h1>
                <Text
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontSize="lg"
                  letterSpacing="wide"
                  mt="15px"
                >
                  {friend.name}
                </Text>
                <Text
                  decoration="underline solid pink 4px"
                  mt="10px"
                >{`Birthday`}</Text>
                <Text fontWeight="bold">
                  {formatDateYMD(friend.birthday)}
                </Text>
                <Text
                  decoration="underline solid pink 4px"
                  mt="15px"
                >{`Address`}</Text>
                <Text w="200px" fontWeight="bold">
                  {friend.address}
                </Text>
              </Flex>
            </Box>
          )}
          <Box
            boxShadow="md"
            p="6"
            rounded="lg"
            bg="#fff9ec"
            h="500px"
            w="350px"
          >
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <h1 className={styles.friend}>Gift Ideas</h1>
              <Stack spacing={2}>
                {friendFilter().map((gift) => (
                  <Text key={gift.id} fontWeight="bold">
                    <Link
                      as={RLink}
                      to={`/gifts/${gift.id}`}
                      mr="10px"
                    >
                      {gift.idea}
                    </Link>
                    {gift.link ? (
                      <Link href={gift.link} isExternal>
                        <ExternalLinkIcon color="#6b46c1" />
                      </Link>
                    ) : (
                      ''
                    )}
                  </Text>
                ))}
              </Stack>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

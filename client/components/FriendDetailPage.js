import { Box, Flex, IconButton, Stack, Text } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import useFriends from '../hooks/useFriends.js';
import Header from './Header.js';
import Loader from './Loader.js';
import styles from '../global.css';
import { useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import useGifts from '../hooks/useGifts.js';
import FriendForm from './FriendForm.js';
import { formatDate } from '../services/general-utils.js';

export default function FriendDetailPage() {
  const { user, loading } = useUser();
  const { id } = useParams();
  const { friend, setFriend, friendLoading } = useFriends(id, user);
  const { gifts } = useGifts();
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
                  decoration="underline solid pink.500 4px"
                  mt="10px"
                >{`Birthday`}</Text>
                <Text fontWeight="bold">
                  {formatDate(friend.birthday)}
                </Text>
                <Text
                  decoration="underline solid pink.500 4px"
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
              <Text>{`For list of gifts! with delete buttons, then eliminate delete buttons from front page`}</Text>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

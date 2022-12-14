import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
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
import {
  DownloadIcon,
  EditIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import useGifts from '../hooks/useGifts.js';
import FriendForm from './FriendForm.js';
import { formatDateYMD } from '../services/general-utils.js';
import { Link as RLink } from 'react-router-dom';
import logo from '../public/logo.png';

export default function FriendDetailPage() {
  const { user, loading } = useUser();
  const { id } = useParams();
  const { friend, setFriend, friendLoading } = useFriends(id, user);
  const { friendFilter } = useGifts(id);
  const [isEditing, setIsEditing] = useState(false);

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;
  if (friend === null) return <Navigate to="/" />;

  const handlePrint = () => {
    window.print();
  };

  // FOR PASSING TO DATE INPUT IN EDITING FORM
  let calendarDate;
  if (!friendLoading) {
    if (friend.birthday != null) {
      calendarDate = friend.birthday.slice(0, 10);
    } else {
      calendarDate = '';
    }
  }

  return (
    <>
      <Header />
      {friendLoading ? (
        <Loader />
      ) : (
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap="25px"
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h={{ base: '100%vh', md: 'calc(100vh)' }}
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
              className={styles.screenOnly}
              boxShadow="lg"
              p="6"
              rounded="lg"
              bg="#fff9ec"
              h="400px"
              w={{ base: '300px', md: '350px' }}
              mt={{ base: '25px', md: '0px' }}
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
                <Text fontWeight="bold">{friend.address}</Text>
              </Flex>
            </Box>
          )}
          <Box
            boxShadow="lg"
            p="6"
            rounded="lg"
            bg="#fff9ec"
            minH={{ base: '300px', md: '400px' }}
            w={{ base: '300px', md: '350px' }}
            mb={{ base: '25px', md: '0px' }}
          >
            <Flex
              direction="column"
              justifyContent="space-between"
              alignContent="center"
              minH={{ base: '250px', md: '350px' }}
            >
              <Box className={styles.screenOnly}>
                <Flex justifyContent="flex-end" m="-15px">
                  <IconButton
                    aria-label="print-gift-list"
                    size="lg"
                    colorScheme="pink"
                    variant="ghost"
                    icon={<DownloadIcon />}
                    onClick={handlePrint}
                  />
                </Flex>
              </Box>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box mt={{ base: '0px', md: '-125px' }}>
                  <h1 className={styles.friend}>Gift Ideas</h1>

                  <h1
                    className={styles.printOnly}
                  >{`FOR ${friend.name.toUpperCase()}`}</h1>
                  {/* ^^^ DISPLAYED ONLY IN PRINT ^^^ */}
                </Box>
                <Stack spacing={2} mt="20px">
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
                        <Link
                          href={gift.link}
                          isExternal
                          className={styles.screenOnly}
                        >
                          <ExternalLinkIcon color="#6b46c1" />
                        </Link>
                      ) : (
                        ''
                      )}
                    </Text>
                  ))}
                </Stack>
                <Image
                  className={styles.printOnly}
                  id="logo"
                  src={logo}
                  boxSize="65px"
                  alt="logo"
                  mt="50px"
                />
              </Flex>
              <Flex justifyContent="center">
                <Link
                  as={RLink}
                  to="/"
                  color="#e24e96"
                  fontWeight="bold"
                >
                  <h1 className={styles.screenOnly}>
                    Add Gifts from the Homepage.
                  </h1>
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

import { Box, Flex, Text, Link, IconButton } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import useGifts from '../hooks/useGifts.js';
import styles from '../global.css';
import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useUser } from '../context/userContext.js';
import { useState } from 'react';
import NewGiftForm from './NewGiftForm.js';
import Header from './Header.js';
import Loader from './Loader.js';

export default function GiftDetailPage() {
  // Edit Button = onClick load form?
  // Save Button = onClick handleUpdateGift, render just display
  const { user, loading } = useUser();
  const { id } = useParams();
  const { gift, setGift, giftLoading } = useGifts(id, user);
  console.log('gift from GiftDetail useGifts call:', gift);
  const [isEditing, setIsEditing] = useState(false);

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;
  if (gift === null) return <Navigate to="/" />;

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  return (
    <>
      <Header />
      {giftLoading ? (
        <Loader />
      ) : (
        <Flex
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h="calc(100vh)"
          justifyContent="center"
          alignItems="center"
        >
          {isEditing ? (
            <NewGiftForm
              gift={gift}
              setGift={setGift}
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
                  colorScheme="purple"
                  variant="ghost"
                  icon={<EditIcon />}
                  onClick={handleEditToggle}
                >
                  Update
                </IconButton>
              </Flex>
              <Flex direction="column" alignItems="center">
                <h1 className={styles.title} id={styles.drop}>
                  Gift Idea
                </h1>
                <Text
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontSize="lg"
                  letterSpacing="wide"
                  mt="15px"
                >
                  {gift.idea}
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  mb="15px"
                >{`for ${gift.friend?.name}`}</Text>
                <Text mb="20px">{`An ideal ${gift.occasion} present!`}</Text>
                {gift.price != 0 && <Text>{`$${gift.price}`}</Text>}
                {gift.link != '' && (
                  <Link href={gift.link} isExternal>
                    Buy Online <ExternalLinkIcon color="#6b46c1" />
                  </Link>
                )}
              </Flex>
            </Box>
          )}
        </Flex>
      )}
    </>
  );
}

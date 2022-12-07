import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Box,
} from '@chakra-ui/react';

import { useState } from 'react';
import {
  addGift,
  editGift,
  getAllGifts,
  getById,
} from '../services/gift-utils.js';
import styles from '../global.css';
import useFriends from '../hooks/useFriends.js';
import { addFriend } from '../services/friend-utils.js';

export default function NewGiftForm({
  gift,
  setGift,
  setGifts,
  isEditing,
  setIsEditing,
}) {
  const { friends } = useFriends();
  const [idea, setIdea] = useState(gift.idea || '');
  const [recipient, setRecipient] = useState(gift.friend?.name || '');
  const [link, setLink] = useState(gift.link || '');
  const [cost, setCost] = useState(gift.price || 0);
  const [occasion, setOccasion] = useState(gift.occasion || '');
  const [isIdeaError, setIsIdeaError] = useState(false);
  const [isRecipientError, setIsRecipientError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const price = !cost ? 0 : cost;
  let isFormInvalid = false;
  let selectedFriend = gift.friend || {};

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(recipient.toLowerCase())
  );

  const handleAddGift = async (e) => {
    if (!idea) {
      setIsIdeaError(true);
      isFormInvalid = true;
    }

    if (!recipient) {
      setIsRecipientError(true);
      isFormInvalid = true;
    }
    if (isFormInvalid) return;

    if (!selectedFriend.id && recipient) {
      const newFriend = await addFriend({ name: recipient });
      selectedFriend = newFriend;
    }

    const newGift = {
      idea,
      friendId: selectedFriend.id,
      link,
      price,
      occasion,
    };

    await addGift(newGift);
    const newList = await getAllGifts();
    setGifts(newList);
    setIdea('');
    setRecipient('');
    setLink('');
    setCost('');
    setOccasion('');
    selectedFriend = {};
    setIsIdeaError(false);
    setIsRecipientError(false);
    isFormInvalid = false;
  };

  const handleEditGift = async () => {
    if (!idea) {
      setIsIdeaError(true);
      isFormInvalid = true;
    }

    if (!recipient) {
      setIsRecipientError(true);
      isFormInvalid = true;
    }
    if (isFormInvalid) return;

    if (!selectedFriend.id && recipient) {
      const newFriend = await addFriend({ name: recipient });
      selectedFriend = newFriend;
    }
    console.log('selectedFriend:', selectedFriend);
    const id = gift.id;
    const newValues = {
      id,
      idea,
      friendId: selectedFriend.id,
      link,
      price,
      occasion,
    };
    await editGift({ ...gift, ...newValues });
    const updatedGift = await getById(id);
    setGift(updatedGift);
    setIsEditing(false);
  };

  return (
    <>
      <Box
        boxShadow="md"
        p="6"
        rounded="lg"
        bg="#fff9ec"
        w="500px"
        h="600px"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={1}>
            <h1 className={styles.title}>Cache Your Clever Idea!</h1>
            <FormControl isRequired isInvalid={isIdeaError}>
              <FormLabel
                requiredIndicator
                htmlFor="idea"
                size="sm"
                fontWeight="bold"
              >
                Gift:
              </FormLabel>
              <Input
                type="text"
                id="idea"
                size="sm"
                borderRadius="5px"
                variant="outline"
                bg="white"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
              {isIdeaError ? (
                <FormErrorMessage>
                  You forgot to enter your genius gift idea!
                </FormErrorMessage>
              ) : (
                <FormHelperText visibility="hidden">
                  &nbsp;
                </FormHelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isRecipientError}>
              <FormLabel
                requiredIndicator
                htmlFor="recipient"
                size="sm"
                fontWeight="bold"
              >
                Recipient:
              </FormLabel>
              <Input
                type="text"
                id="recipient"
                size="sm"
                borderRadius="5px"
                variant="outline"
                bg="white"
                value={recipient}
                onFocus={() => setIsFocused(true)}
                // onBlur={() => setIsFocused(false)}
                onChange={(e) => setRecipient(e.target.value)}
              />
              {isFocused && recipient !== '' && (
                <Box
                  bg="white"
                  position="absolute"
                  width="367.5px"
                  height="100px"
                  zIndex="1"
                >
                  <Box
                    bg="white"
                    position="relative"
                    width="367.5px"
                    height="100px"
                  >
                    <Flex direction="column" alignItems="flex-start">
                      {filteredFriends.map((friend) => (
                        <Button
                          key={friend.id}
                          variant="unstyled"
                          pl="5px"
                          onClick={() => {
                            console.log('firing!');
                            setRecipient(friend.name);
                            selectedFriend = friend;
                            setIsFocused(false);
                          }}
                        >
                          {friend.name}
                        </Button>
                      ))}
                    </Flex>
                  </Box>
                </Box>
              )}
              {isRecipientError ? (
                <FormErrorMessage>
                  Who would love to receive this gift?
                </FormErrorMessage>
              ) : (
                <FormHelperText visibility="hidden">
                  &nbsp;
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="link" size="sm" fontWeight="bold">
                Link:
              </FormLabel>
              <Input
                type="text"
                id="link"
                size="sm"
                borderRadius="5px"
                variant="outline"
                bg="white"
                placeholder="http://small-local-vendor.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <FormHelperText visibility="hidden">
                &nbsp;
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cost" size="sm" fontWeight="bold">
                Price:
              </FormLabel>
              <Input
                type="number"
                id="cost"
                size="sm"
                borderRadius="5px"
                variant="outline"
                bg="white"
                value={price}
                onChange={(e) => setCost(e.target.value)}
              />

              <FormHelperText visibility="hidden">
                &nbsp;
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel
                htmlFor="occasion"
                size="sm"
                fontWeight="bold"
              >
                Occasion:
              </FormLabel>
              <Input
                type="text"
                id="occasion"
                size="sm"
                borderRadius="5px"
                variant="outline"
                bg="white"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
              />
              <FormHelperText visibility="hidden">
                &nbsp;
              </FormHelperText>
            </FormControl>
            <Flex justifyContent="center">
              <Button
                onClick={isEditing ? handleEditGift : handleAddGift}
                size="md"
                w="75px"
                colorScheme="purple"
              >
                Save
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}

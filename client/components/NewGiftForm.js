import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addGift, getAllGifts } from '../services/gift-utils.js';
import styles from '../global.css';

export default function NewGiftForm({ gift, setGift, setGifts }) {
  const [idea, setIdea] = useState(gift.idea);
  const [recipient, setRecipient] = useState(gift.recipient);
  const [link, setLink] = useState(gift.link);
  const [cost, setCost] = useState(gift.price);
  const [occasion, setOccasion] = useState(gift.occasion);
  const [isIdeaError, setIsIdeaError] = useState(false);
  const [isRecipientError, setIsRecipientError] = useState(false);

  const price = !cost ? 0 : cost;

  const handleAddGift = async (e) => {
    let isFormInvalid = false;

    if (!idea) {
      setIsIdeaError(true);
      isFormInvalid = true;
    }

    if (!recipient) {
      setIsRecipientError(true);
      isFormInvalid = true;
    }
    if (isFormInvalid) return;

    const newGift = {
      idea,
      recipient,
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
    setIsIdeaError(false);
    setIsRecipientError(false);
    isFormInvalid = false;
  };

  return (
    <>
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
              size="md"
              fontWeight="bold"
            >
              Gift:
            </FormLabel>
            <Input
              type="text"
              id="idea"
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
              size="md"
              fontWeight="bold"
            >
              Recipient:
            </FormLabel>
            <Input
              type="text"
              id="recipient"
              variant="outline"
              bg="white"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />

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
            <FormLabel htmlFor="link" size="md" fontWeight="bold">
              Link:
            </FormLabel>
            <Input
              type="text"
              id="link"
              variant="outline"
              bg="white"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <FormHelperText>Enter complete url.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="cost" size="md" fontWeight="bold">
              Price:
            </FormLabel>
            <Input
              type="number"
              id="cost"
              variant="outline"
              bg="white"
              value={price}
              onChange={(e) => setCost(e.target.value)}
            />

            <FormHelperText>
              Enter numeric value with no symbols.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="occasion" size="md" fontWeight="bold">
              Occasion:
            </FormLabel>
            <Input
              type="text"
              id="occasion"
              variant="outline"
              bg="white"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            />
            <FormHelperText visibility="hidden">
              &nbsp;
            </FormHelperText>
          </FormControl>
          <Button
            onClick={handleAddGift}
            size="md"
            w="75px"
            colorScheme="purple"
          >
            Save
          </Button>
        </Stack>
      </Flex>
    </>
  );
}

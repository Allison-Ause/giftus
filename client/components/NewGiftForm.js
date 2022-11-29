import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addGift } from '../services/gift-utils.js';

export default function NewGiftForm() {
  const [idea, setIdea] = useState('');
  const [recipient, setRecipient] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [occasion, setOccasion] = useState('');

  const handleAddGift = async (e) => {
    const newGift = {
      idea,
      recipient,
      url,
      price,
      occasion,
    };
    await addGift(newGift);
    setIdea('');
    setRecipient('');
    setUrl('');
    setPrice('');
    setOccasion('');
  };

  // const handleAddGift = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const newGift = {
  //     idea: formData.get('idea'),
  //     for: formData.get('for'),
  //     link: formData.get('link'),
  //     price: formData.get('price'),
  //     occasion: formData.get('occasion'),
  //   };
  //   await addGift(newGift);
  //   e.target.reset();
  // };

  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing={4}>
          <h1>Cache Your Clever Idea!</h1>
          <FormControl isRequired>
            <FormLabel requiredIndicator size="md" fontWeight="bold">
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
          </FormControl>
          <FormControl isRequired>
            <FormLabel requiredIndicator size="md" fontWeight="bold">
              For:
              <Input
                type="text"
                id="for"
                variant="outline"
                bg="white"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </FormLabel>
          </FormControl>
          <FormLabel size="md" fontWeight="bold">
            Link:
            <Input
              type="text"
              id="url"
              variant="outline"
              bg="white"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </FormLabel>
          <FormLabel size="md" fontWeight="bold">
            Price:
            <Input
              type="number"
              id="price"
              variant="outline"
              bg="white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormLabel>
          <FormLabel size="md" fontWeight="bold">
            Occasion:
            <Input
              type="text"
              id="occasion"
              variant="outline"
              bg="white"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            />
          </FormLabel>
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

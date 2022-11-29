import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addGift, getAllGifts } from '../services/gift-utils.js';

export default function NewGiftForm({ setGifts }) {
  const [idea, setIdea] = useState('');
  const [recipient, setRecipient] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [occasion, setOccasion] = useState('');

  const handleAddGift = async (e) => {
    const newGift = {
      idea,
      recipient,
      link,
      price,
      occasion,
    };
    console.log('newGift', newGift);

    await addGift(newGift);
    const newList = await getAllGifts();
    setGifts(newList);
    // had issues with this because I don't have an id to use in the key. Must refetch.
    // setGifts((prevState) => [newGift, ...prevState]);

    setIdea('');
    setRecipient('');
    setLink('');
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
          </FormControl>
          <FormControl isRequired>
            <FormLabel
              requiredIndicator
              htmlFor="recipient"
              size="md"
              fontWeight="bold"
            >
              For:
              <Input
                type="text"
                id="recipient"
                variant="outline"
                bg="white"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </FormLabel>
          </FormControl>
          <FormLabel htmlFor="link" size="md" fontWeight="bold">
            Link:
            <Input
              type="text"
              id="link"
              variant="outline"
              bg="white"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormLabel>
          <FormLabel htmlFor="price" size="md" fontWeight="bold">
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
          <FormLabel htmlFor="occasion" size="md" fontWeight="bold">
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

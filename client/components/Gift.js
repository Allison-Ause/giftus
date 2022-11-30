import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { deleteGift, getAllGifts } from '../services/gift-utils.js';

export default function Gift({
  id,
  idea,
  recipient,
  price,
  occasion,
  setGifts,
}) {
  // make this flex box with column of individual gift rows
  const handleDelete = async () => {
    await deleteGift(id);
    const giftList = await getAllGifts();
    setGifts(giftList);
  };

  return (
    <Flex direction="row" gap="3.7px" alignItems="center">
      {/* conditional rendering not displaying as Link. Why? */}
      {/* {gift.url ? (
        <Link to={gift.url}>{gift.idea}</Link>
      ) : (
        <h1>{gift.idea}</h1>
      )} */}
      <Text fontWeight="bold">{idea}</Text>
      <Text>{`for ${recipient}`}</Text>
      {price != 0 && <Text>{`$${price}`}</Text>}
      <Text>{occasion}</Text>
      <IconButton
        aria-label="delete gift"
        icon={<DeleteIcon />}
        variant="ghost"
        colorScheme="purple"
        onClick={handleDelete}
      />
    </Flex>
  );
}

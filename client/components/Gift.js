import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Link, Text } from '@chakra-ui/react';
import { deleteGift, getAllGifts } from '../services/gift-utils.js';
import { Link as RLink } from 'react-router-dom';

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
      <Link as={RLink} to={`gifts/${id}`} fontWeight="bold">
        {idea}
      </Link>
      <Text>{`for ${recipient}`}</Text>
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

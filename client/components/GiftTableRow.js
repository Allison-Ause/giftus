import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Link, Td, Tr } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';
import { deleteGift, getAllGifts } from '../services/gift-utils.js';
import useGifts from '../hooks/useGifts.js';

export default function GiftTableRow({ gift, isMobile }) {
  const { setGifts } = useGifts();

  const handleDelete = async () => {
    await deleteGift(gift.id);
    const giftList = await getAllGifts();
    setGifts(giftList);
  };

  return (
    <Tr>
      <Td>
        <Link as={RLink} to={`${gift.id}`} fontWeight="bold">
          {gift.idea}
        </Link>
      </Td>
      <Td>
        <Link as={RLink} to={`/friends/${gift.friend.id}`}>
          {gift.friend.name}
        </Link>
      </Td>
      {!isMobile && (
        <Td>{gift.price === 0 ? '' : `$${gift.price}`}</Td>
      )}
      {!isMobile && <Td>{gift.occasion}</Td>}
      {!isMobile && (
        <Td>
          <IconButton
            aria-label="delete friend"
            icon={<DeleteIcon />}
            variant="ghost"
            colorScheme="purple"
            onClick={handleDelete}
          />
        </Td>
      )}
    </Tr>
  );
}

// {((isMobile && gift.occasion.toLowerCase() === 'christmas') ||
//   (isMobile && gift.occasion.toLowerCase() === 'xmas')) && (
//   <Td>🎄</Td>
// )}
// {((isMobile && gift.occasion.toLowerCase() === 'birthday') ||
//   (isMobile && gift.occasion.toLowerCase() === 'bday')) && (
//   <Td>🎂</Td>
// )}
// {isMobile && gift.occasion === '' && <Td>{''}</Td>}

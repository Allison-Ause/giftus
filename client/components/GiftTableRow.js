import { Link, Td, Tr } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';

export default function GiftTableRow({ gift, isMobile }) {
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

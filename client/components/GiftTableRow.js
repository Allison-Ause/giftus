import { Link, Td, Tr } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';

export default function GiftTableRow({ gift }) {
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
      <Td>{`$${gift.price}`}</Td>
      <Td>{gift.occasion}</Td>
    </Tr>
  );
}

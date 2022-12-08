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
      <Td>{gift.friend.name}</Td>
      <Td>{`$${gift.price}`}</Td>
      <Td>{gift.occasion}</Td>
    </Tr>
  );
}

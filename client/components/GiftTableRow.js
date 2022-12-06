import { Td, Tr } from '@chakra-ui/react';

export default function GiftTableRow({ gift }) {
  return (
    <Tr>
      <Td>{gift.idea}</Td>
      <Td>{gift.friend.name}</Td>
      <Td>{`$${gift.price}`}</Td>
      <Td>{gift.occasion}</Td>
    </Tr>
  );
}

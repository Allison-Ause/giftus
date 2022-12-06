import { Td, Tr } from '@chakra-ui/react';

export default function GiftTableRow({ gift }) {
  return (
    <Tr>
      <Td>{gift.idea}</Td>
      <Td>{gift.recipient}</Td>
      <Td>{`$${gift.price}`}</Td>
      <Td>{gift.occasion}</Td>
    </Tr>
  );
}

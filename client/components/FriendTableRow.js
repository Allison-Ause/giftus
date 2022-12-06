import { Td, Tr } from '@chakra-ui/react';

export default function FriendTableRow({ friend, displayDate }) {
  return (
    <Tr>
      <Td>{friend.name}</Td>
      <Td>{displayDate}</Td>
      <Td>{friend.address}</Td>
    </Tr>
  );
}

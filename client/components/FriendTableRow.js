import { Td, Tr } from '@chakra-ui/react';

export default function FriendTableRow({ friend }) {
  return (
    <Tr>
      <Td>{friend.name}</Td>
      <Td>{friend.birthday}</Td>
      <Td>{friend.address}</Td>
    </Tr>
  );
}

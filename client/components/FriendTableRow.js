import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr } from '@chakra-ui/react';
import {
  deleteFriend,
  getAllFriends,
} from '../services/friend-utils.js';

export default function FriendTableRow({
  friend,
  setFriends,
  displayDate,
}) {
  const handleDelete = async () => {
    await deleteFriend(friend.id);
    const friendList = await getAllFriends();
    setFriends(friendList);
  };

  return (
    <Tr>
      <Td>{friend.name}</Td>
      <Td>{displayDate}</Td>
      <Td>{friend.address}</Td>
      <Td>
        <IconButton
          aria-label="delete friend"
          icon={<DeleteIcon />}
          variant="ghost"
          colorScheme="pink"
          onClick={handleDelete}
        />
      </Td>
    </Tr>
  );
}

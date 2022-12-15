import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Td, Tr, Link } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';
import {
  deleteFriend,
  getAllFriends,
} from '../services/friend-utils.js';

export default function FriendTableRow({
  friend,
  setFriends,
  displayDate,
  isMobile,
}) {
  const handleDelete = async () => {
    await deleteFriend(friend.id);
    const friendList = await getAllFriends();
    setFriends(friendList);
  };

  return (
    <Tr>
      <Td fontWeight="bold">
        <Link as={RLink} to={`${friend.id}`}>
          {friend.name}
        </Link>
      </Td>
      <Td>{displayDate}</Td>
      {!isMobile && <Td>{friend.address}</Td>}
      {!isMobile && (
        <Td>
          <IconButton
            aria-label="delete friend"
            icon={<DeleteIcon />}
            variant="ghost"
            colorScheme="pink"
            onClick={handleDelete}
          />
        </Td>
      )}
    </Tr>
  );
}

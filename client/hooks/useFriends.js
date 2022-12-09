import { useEffect, useState } from 'react';
import {
  getAllFriends,
  getFriendById,
} from '../services/friend-utils.js';

export default function useFriends(id, user) {
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});
  const [friendLoading, setFriendLoading] = useState(true);
  const [friendSearchTerm, setFriendSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const friendList = await getAllFriends();
      setFriends(friendList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const singleFriend = await getFriendById(id);
      setFriend(singleFriend);
      setFriendLoading(false);
    };
    fetchData();
  }, [user]);

  const searchFriends = () => {
    const friendsSearchResult = friends.filter(
      (friend) =>
        friend.name
          .toLowerCase()
          .includes(friendSearchTerm.toLowerCase()) ||
        friend.address
          .toLowerCase()
          .includes(friendSearchTerm.toLowerCase())
    );
    return friendsSearchResult;
  };

  return {
    friends,
    setFriends,
    friend,
    setFriend,
    friendLoading,
    setFriendLoading,
    searchFriends,
    friendSearchTerm,
    setFriendSearchTerm,
  };
}

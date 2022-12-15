import { useEffect, useState } from 'react';
import {
  getAllFriends,
  getFriendById,
} from '../services/friend-utils.js';

export default function useFriends(id, user) {
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState({});
  const [friendLoading, setFriendLoading] = useState(true);
  const [friendsLoading, setFriendsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const friendList = await getAllFriends();
      setFriends(friendList);
      setFriendsLoading(false);
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

  return {
    friends,
    setFriends,
    friend,
    setFriend,
    friendLoading,
    setFriendLoading,
    friendsLoading,
  };
}

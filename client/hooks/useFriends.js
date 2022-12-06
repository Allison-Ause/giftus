import { useEffect, useState } from 'react';
import { getAllFriends } from '../services/friend-utils.js';

export default function useFriends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const friendList = await getAllFriends();
      setFriends(friendList);
    };
    fetchData();
  }, []);
  return { friends, setFriends };
}

import { useEffect, useState } from 'react';
import { getAllGifts, getById } from '../services/gift-utils.js';

// add loading state for gifts and pass out
export default function useGifts(id, user) {
  const [gifts, setGifts] = useState([]);
  const [gift, setGift] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const giftList = await getAllGifts();
      setGifts(giftList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const gift = await getById(id);
      setGift(gift);
    };
    fetchData();
  }, [user]);

  const filterGifts = () => {
    const filteredGifts = gifts.filter(
      (gift) =>
        gift.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.recipient
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        gift.occasion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredGifts;
  };

  return {
    gifts,
    setGifts,
    gift,
    setGift,
    filterGifts,
    searchTerm,
    setSearchTerm,
  };
}

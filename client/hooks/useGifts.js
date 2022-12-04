import { useEffect, useState } from 'react';
import { getAllGifts, getById } from '../services/gift-utils.js';

// add loading state for gifts and pass out
export default function useGifts(id, user) {
  const [gifts, setGifts] = useState([]);
  const [gift, setGift] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const giftList = await getAllGifts();
      setGifts(giftList);
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const gift = await getById(id);
      setGift(gift);
    };
    fetchData();
  }, [user]);

  return { gifts, setGifts, gift, setGift };
}

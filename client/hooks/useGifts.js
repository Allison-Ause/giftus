import { useEffect, useState } from 'react';
import { getAllGifts, getById } from '../services/gift-utils.js';

export default function useGifts(id) {
  const [gifts, setGifts] = useState([]);
  const [gift, setGift] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const giftList = await getAllGifts();
      setGifts(giftList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const gift = await getById(id);
      setGift(gift);
    };
    fetchData();
  }, []);

  return { gifts, setGifts, gift, setGift };
}

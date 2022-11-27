import { useEffect, useState } from 'react';
import { getAllGifts } from '../services/gift-utils';

export default function useGifts() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const giftList = await getAllGifts();
      console.log('giftList', giftList);
      setGifts(giftList);
    };
    fetchData();
  }, []);

  return { gifts, setGifts };
}

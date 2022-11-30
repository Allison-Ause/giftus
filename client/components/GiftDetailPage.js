import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useGifts from '../hooks/useGifts.js';

export default function GiftDetailPage() {
  // Edit Button = onClick load form?
  // Save Button = onClick handleUpdateGift, render just display
  const { id } = useParams();
  const { gift } = useGifts(id);

  return (
    <div>
      <Box>
        <h1>Your Idea:</h1>
        <Text>{gift.idea}</Text>
        {/* <Text>{recipient}</Text>
        <Text>{link}</Text>
        <Text>{price}</Text> */}
      </Box>
    </div>
  );
}

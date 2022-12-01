import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useGifts from '../hooks/useGifts.js';
import styles from '../global.css';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function GiftDetailPage() {
  // Edit Button = onClick load form?
  // Save Button = onClick handleUpdateGift, render just display
  const { id } = useParams();
  const {
    gift: { idea, recipient, link, price, occasion },
  } = useGifts(id);

  return (
    <Flex
      className={styles.bg}
      backgroundPosition="bottom-left"
      backgroundSize="cover"
      h="calc(100vh)"
    >
      <Box boxShadow="md" p="6" rounded="lg" bg="#fff9ec">
        <h1 className={styles.title}>Gift Idea</h1>
        <Text>{idea}</Text>
        <Text>{recipient}</Text>
        <Link href={link} isExternal>
          Buy Online <ExternalLinkIcon color="#6b46c1" />
        </Link>
        {price != 0 && <Text>{`$${price}`}</Text>}
        <Text>{occasion}</Text>
      </Box>
    </Flex>
  );
}

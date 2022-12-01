import { Box, Flex, Text, Link, IconButton } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useGifts from '../hooks/useGifts.js';
import styles from '../global.css';
import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';

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
      justifyContent="center"
      alignItems="center"
    >
      <Box
        boxShadow="md"
        p="6"
        rounded="lg"
        bg="#fff9ec"
        h="400px"
        w="350px"
      >
        <Flex justifyContent="flex-end" m="-15px">
          <IconButton
            aria-label="edit-gift"
            size="md"
            colorScheme="purple"
            variant="ghost"
            icon={<EditIcon />}
          >
            Update
          </IconButton>
        </Flex>
        <Flex direction="column" alignItems="center">
          <h1 className={styles.title} id={styles.drop}>
            Gift Idea
          </h1>
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="lg"
            letterSpacing="wide"
            mt="15px"
          >
            {idea}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            mb="15px"
          >{`for ${recipient}`}</Text>
          <Text mb="20px">{`A great gift for ${occasion}!`}</Text>
          {price != 0 && <Text>{`$${price}`}</Text>}
          {link != '' && (
            <Link href={link} isExternal>
              Buy Online <ExternalLinkIcon color="#6b46c1" />
            </Link>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}

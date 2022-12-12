import { Flex } from '@chakra-ui/react';
import styles from '../loader.css';
import global from '../global.css';

export default function Loader() {
  return (
    <>
      <Flex
        direction="column"
        className={global.bg}
        backgroundPosition="bottom-left"
        backgroundSize="cover"
        h={{ base: '100%vh', md: 'calc(100vh)' }}
        padding="30px"
        justifyContent="center"
        alignItems="center"
      >
        <div className={styles.ball}></div>
        <div className={styles.shadow}></div>
      </Flex>
    </>
  );
}

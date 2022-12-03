import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { useUser } from '../context/userContext.js';
import styles from '../global.css';
import { signOutUser } from '../services/user-utils.js';

export default function Header() {
  const { user, setUser } = useUser();
  console.log('user in header', user);

  const handleSignOut = async () => {
    console.log('firing');
    await signOutUser();
    setUser(null);
  };

  return (
    <header>
      <Flex
        backgroundColor="#ffeef2"
        justifyContent={user ? 'space-between' : 'center'}
        p="5px"
        alignItems="center"
      >
        <h1 id={styles.header}>Cadeau Caché</h1>
        {/* <h1>Mise de Côté</h1> */}
        <Flex alignItems="center">
          {/* <IconButton
            aria-label="search-database"
            variant="ghost"
            colorScheme="purple"
            icon={<SearchIcon />}
          /> */}
          {user && (
            <Menu colorScheme="purple">
              <MenuButton
                as={Button}
                mr="10px"
                colorScheme="purple"
                variant="ghost"
              >
                <HamburgerIcon h="30px" w="30px" />
              </MenuButton>
              <MenuList minW="110" p="10px">
                <MenuItem
                  color="#482698"
                  fontWeight="bold"
                  h="35px"
                  p="5px"
                >
                  Gifts
                </MenuItem>
                <MenuItem
                  color="#482698"
                  fontWeight="bold"
                  h="35px"
                  p="5px"
                  onClick={handleSignOut}
                >
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </header>
  );
}

import {
  HamburgerIcon,
  SearchIcon,
  SmallAddIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import styles from '../global.css';
import { signOutUser } from '../services/user-utils.js';

export default function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async () => {
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
        <a href="/">
          <h1 id={styles.header}>Gifthis</h1>
        </a>

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
                  onClick={() => navigate('/gifts')}
                >
                  Gifts
                  <SearchIcon pl="5px" boxSize="5" />
                </MenuItem>
                <MenuItem
                  color="#482698"
                  fontWeight="bold"
                  h="35px"
                  p="5px"
                  onClick={() => navigate('/friends')}
                >
                  Friends
                  <SearchIcon pl="5px" boxSize="5" />
                </MenuItem>
                <MenuItem
                  color="#482698"
                  fontWeight="bold"
                  h="35px"
                  p="5px"
                  onClick={() => navigate('/friends/new')}
                >
                  Add Friend
                  <SmallAddIcon pl="5px" boxSize="6" />
                </MenuItem>
                <MenuItem
                  color="#482698"
                  fontWeight="bold"
                  h="35px"
                  p="5px"
                  onClick={() => navigate('/')}
                >
                  Home
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

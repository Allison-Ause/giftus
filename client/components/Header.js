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
  Image,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext.js';
import styles from '../global.css';
import { signOutUser } from '../services/user-utils.js';
import logo from '../public/logo.png';
import snowflake from '../public/snowflake.png';
import { useTheme } from '../context/themeContext.js';

export default function Header() {
  const { user, setUser } = useUser();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  console.log('theme:', theme);
  const handleTheme = () => {
    theme === 'default' ? setTheme('festive') : setTheme('default');
    console.log('theme is:', theme);
  };

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
      >
        <Flex
          direction="row"
          gap="5px"
          alignItems="flex-end"
          justifyContent="flex-start"
        >
          <Image
            id="logo"
            src={logo}
            boxSize="65px"
            alt="logo"
            ml="10px"
            margin="5px"
          />
          <a href="/">
            <h1 id={styles.header}>Giftus</h1>
          </a>
        </Flex>

        {user && (
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <FormControl>
              <FormLabel htmlFor="change-theme">
                <Switch
                  id="theme-toggle"
                  size="md"
                  colorScheme="purple"
                  onChange={handleTheme}
                />
              </FormLabel>
            </FormControl>
            <Image
              id="snowflake"
              src={snowflake}
              boxSize="25px"
              ml="-20px"
              mr="15px"
            />
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
                  View Gifts
                  <SearchIcon pl="5px" boxSize="5" />
                </MenuItem>
                <MenuItem
                  color="#482698"
                  fontWeight="bold"
                  h="35px"
                  p="5px"
                  onClick={() => navigate('/friends')}
                >
                  View Friends
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
          </Flex>
        )}
      </Flex>
    </header>
  );
}

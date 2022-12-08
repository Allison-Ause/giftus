import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { addFriend } from '../services/friend-utils.js';
import styles from '../global.css';
import Header from './Header.js';
import Loader from './Loader.js';
import { useUser } from '../context/userContext.js';

export default function FriendForm() {
  const { user, loading } = useUser();
  const [name, setName] = useState('');
  const [birthdayInput, setBirthdayInput] = useState('');
  const [address, setAddress] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const toast = useToast();

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;
  const birthday = !birthdayInput ? '1920-08-18' : birthdayInput;
  let isFormInvalid = false;

  const handleAddFriend = async (e) => {
    if (!name) {
      setIsNameError(true);
      isFormInvalid = true;
    }
    if (isFormInvalid) return;

    const newFriend = {
      name,
      birthday,
      address,
    };

    await addFriend(newFriend);
    setName('');
    setBirthdayInput('');
    setAddress('');
    setIsNameError(false);
    isFormInvalid = false;
    toast({
      position: 'bottom',
      render: () => (
        <Box
          borderRadius="5px"
          boxShadow="md"
          bg="pink.400"
          color="white"
          p="15px"
          fontWeight="bold"
          fontSize="15px"
          h="55px"
          mb="35px"
        >
          {`Successfully added ${newFriend.name}!`}
        </Box>
      ),
    });
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Flex
          direction="column"
          gap="50px"
          className={styles.bg}
          backgroundPosition="bottom-left"
          backgroundSize="cover"
          h="calc(100vh)"
          padding="30px"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            boxShadow="md"
            p="6"
            rounded="lg"
            bg="#fff9ec"
            w="400px"
            h="500px"
          >
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={1}>
                <h1 className={styles.friend}>Add a Friend!</h1>
                <FormControl isRequired isInvalid={isNameError}>
                  <FormLabel
                    requiredIndicator
                    htmlFor="name"
                    size="sm"
                    fontWeight="bold"
                    mt="25px"
                  >
                    Name:
                  </FormLabel>
                  <Input
                    type="text"
                    id="name"
                    size="sm"
                    borderRadius="5px"
                    variant="outline"
                    bg="white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {isNameError ? (
                    <FormErrorMessage>
                      What is your friend's name?
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText visibility="hidden">
                      &nbsp;
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel
                    htmlFor="birthday"
                    size="sm"
                    fontWeight="bold"
                  >
                    Birthday:
                  </FormLabel>
                  <Input
                    type="date"
                    id="birthday"
                    size="sm"
                    borderRadius="5px"
                    variant="outline"
                    bg="white"
                    value={birthdayInput}
                    onChange={(e) => setBirthdayInput(e.target.value)}
                  />
                  <FormHelperText visibility="hidden">
                    &nbsp;
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel
                    htmlFor="address"
                    size="sm"
                    fontWeight="bold"
                  >
                    Address:
                  </FormLabel>
                  <Textarea
                    type="text"
                    id="address"
                    size="sm"
                    h="40px"
                    borderRadius="5px"
                    variant="outline"
                    bg="white"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <FormHelperText visibility="hidden">
                    &nbsp;
                  </FormHelperText>
                </FormControl>
                <Flex justifyContent="center">
                  <Button
                    onClick={handleAddFriend}
                    size="md"
                    w="75px"
                    colorScheme="pink"
                  >
                    Save
                  </Button>
                </Flex>
              </Stack>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Form } from 'react-router-dom';

export default function FriendForm() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [isNameError, setIsNameError] = useState(false);

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

    console.log('newFriend:', newFriend);
    // add await addFriend(newFriend);
    // set local state to '';
    //     setIsNameError(false);
    // isFormInvalid = false;
  };

  return (
    <>
      <Box
        boxShadow="md"
        p="6"
        rounded="lg"
        bg="#fff9ec"
        w="500px"
        h="600px"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Form></Form>
        </Flex>
      </Box>
    </>
  );
}

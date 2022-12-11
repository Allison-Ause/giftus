import { Link as RLink } from 'react-router-dom';
import { signInUser } from '../services/user-utils.js';
import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import styles from '../global.css';

export default function SignInForm() {
  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const existingUser = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    await signInUser(existingUser);
  };

  return (
    <>
      <Box
        boxShadow="md"
        p="6"
        rounded="lg"
        bg="#fff9ec"
        w={{ base: '300px', md: '425px' }}
        h="400px"
        padding="30px"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1 className={styles.title}>Sign-In</h1>
          <form onSubmit={handleSignIn}>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
              mt={{ base: '5px', md: '25px' }}
            >
              <label>
                Email:
                <input
                  className={styles.input}
                  type="text"
                  name="email"
                />
              </label>
              <label>
                Password:
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                />
              </label>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                type="submit"
                size="md"
                w="75px"
                mb={{ base: '20px', md: '45px' }}
                mt={{ base: '20px', md: '25px' }}
                colorScheme="purple"
              >
                Sign In
              </Button>
            </Flex>
          </form>
          <Text>
            <Link as={RLink} to="/auth/sign-up" color="purple.600">
              Sign Up
            </Link>{' '}
            for an account.
          </Text>
        </Flex>
      </Box>
    </>
  );
}

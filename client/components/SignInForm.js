import { Link } from 'react-router-dom';
import { signInUser } from '../services/user-utils.js';
import { Box, Button, Flex } from '@chakra-ui/react';
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
        w="425px"
        h="400px"
        mt="50px"
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
              mt="25px"
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
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
                mb="45px"
                mt="25px"
                colorScheme="purple"
              >
                Sign In
              </Button>
            </Flex>
          </form>
          <Link to="/auth/sign-up">
            Need to create an account? Sign Up.
          </Link>
        </Flex>
      </Box>
    </>
  );
}

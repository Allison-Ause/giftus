import { Box, Flex, Button, Text, Link } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';
import { signUpUser } from '../services/user-utils.js';
import styles from '../global.css';

export default function SignUpForm() {
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newUser = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    await signUpUser(newUser);
  };

  return (
    <>
      <Box
        boxShadow="md"
        p="6"
        rounded="lg"
        bg="#fff9ec"
        w={{ base: '300px', md: '425px' }}
        h="500px"
        padding="30px"
      >
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <h1 className={styles.title}>Sign-Up</h1>
          <form onSubmit={handleSignUp}>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
              mt={{ base: '5px', md: '25px' }}
            >
              <label>
                First Name:
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                />
              </label>
              <label>
                Last Name:
                <input
                  className={styles.input}
                  type="text"
                  name="lastName"
                />
              </label>
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
                mt={{ base: '10px', md: '25px' }}
                colorScheme="purple"
              >
                Sign Up
              </Button>
            </Flex>
          </form>
          <Text>
            <Link as={RLink} to="/auth/sign-in" color="purple.600">
              Sign In
            </Link>{' '}
            to existing account.
          </Text>
        </Flex>
      </Box>
    </>
  );
}

import { Box, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
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
        w="425px"
        h="600px"
        mt="50px"
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
              mt="25px"
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
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
                mb="15px"
                mt="25px"
                colorScheme="purple"
              >
                Sign Up
              </Button>
            </Flex>
          </form>
          <Link to="/auth/sign-in">
            Already have an account? Sign In.
          </Link>
        </Flex>
      </Box>
    </>
  );
}

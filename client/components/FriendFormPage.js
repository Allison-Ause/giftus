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
import FriendForm from './FriendForm.js';
import { useUser } from '../context/userContext.js';

export default function FriendFormPage() {
  const { user, loading } = useUser();

  if (!loading && !user)
    return <Navigate to="/auth/sign-in" replace />;

  return (
    <>
      <Header />
      {loading ? <Loader /> : <FriendForm />}
    </>
  );
}

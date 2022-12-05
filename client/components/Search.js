import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Search({ gifts, setGifts }) {
  const [searchTerm, setSearchTerm] = useState('');

  // handle search to take searchTerm and filter Gifts state
  // then setGifts to new array of filtered gifts

  return (
    <>
      <InputGroup w="800px">
        <Input
          placeholder="Search gifts..."
          type="text"
          value={searchTerm}
          variant="outline"
          size="md"
          // w="800px"
          bg="rgba(255, 255, 255, 0.722)"
          mb="-15px"
          colorScheme="purple"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement
          children={
            <SearchIcon size="md" color="purple.500" mr="10px" />
          }
        />
      </InputGroup>
    </>
  );
}

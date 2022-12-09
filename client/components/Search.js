import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Search({ searchTerm, setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
          onChange={handleSearch}
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

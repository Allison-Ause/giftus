import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

export default function Search({ searchTerm, setSearchTerm }) {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <InputGroup w="800px">
        <InputLeftElement
          children={
            <SearchIcon
              size="md"
              color="purple.600"
              ml="10px"
              mr="5px"
            />
          }
        />
        <Input
          placeholder="Search gifts..."
          type="text"
          value={searchTerm}
          variant="outline"
          size="md"
          bg="rgba(255, 255, 255, 0.722)"
          mb="-15px"
          colorScheme="purple"
          onChange={handleSearch}
        />
      </InputGroup>
    </>
  );
}

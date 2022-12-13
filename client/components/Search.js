import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export default function Search({
  searchTerm,
  setSearchTerm,
  friendSearchTerm,
  setFriendSearchTerm,
}) {
  const location = useLocation();

  const handleSearch = (e) => {
    if (location.pathname === '/gifts') {
      setSearchTerm(e.target.value);
    } else {
      setFriendSearchTerm(e.target.value);
    }
  };

  return (
    <div>
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
        {location.pathname === '/gifts' ? (
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
        ) : (
          <Input
            placeholder="Search friends..."
            type="text"
            value={friendSearchTerm}
            variant="outline"
            size="md"
            bg="rgba(255, 255, 255, 0.722)"
            mb="-15px"
            colorScheme="purple"
            onChange={handleSearch}
          />
        )}
      </InputGroup>
    </div>
  );
}

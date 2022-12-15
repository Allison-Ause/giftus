import { Box, Flex, Text } from '@chakra-ui/react';

export function formatDateYMD(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return formatDate(date, options);
}

export function formatDateMD(date) {
  const options = {
    month: 'long',
    day: 'numeric',
  };

  return formatDate(date, options);
}

export function formatDate(birthday, options) {
  return birthday === null
    ? ''
    : new Date(birthday).toLocaleString('en-US', options);
}

export function fiveRecentGifts(gifts) {
  return gifts.slice(0, 5);
}

function toUpcomingDate(date) {
  const date2 = new Date(date);
  const now = new Date();

  date2.setFullYear(now.getFullYear());
  if (date2 < now) date2.setFullYear(now.getFullYear() + 1);
  return date2;
}

export function upcomingDates(friends) {
  const allSortedFriends = [...friends];

  allSortedFriends.sort(function (a, b) {
    return (
      toUpcomingDate(new Date(a.birthday)) -
      toUpcomingDate(new Date(b.birthday))
    );
  });

  const sortedFriends = allSortedFriends.filter(
    (friend) => friend.birthday
  );
  return sortedFriends;
}

export function searchItems(items, searchTerm) {
  const searchResults = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return searchResults;
}

export function checkUpcomingBirthdays(friends) {
  const friendList = [...friends];
  let trueDate;
  const today = new Date();
  const twoWeeksAhead = new Date(Date.now() + 12096e5);

  // CONVERT BIRTHDAYS TO THIS YEAR OR NEXT FOR SORTING
  const birthDates = friendList.map((friend) => {
    trueDate = new Date(friend.birthday);
    trueDate.setFullYear(today.getFullYear());
    if (trueDate < today)
      trueDate.setFullYear(today.getFullYear() + 1);
    return { ...friend, birthday: trueDate };
  });

  // FILTER BIRTHDAYS FOR ONLY UPCOMING IN TWO WEEKS
  const upcomingDates = birthDates.filter((friend) => {
    return (
      today.getTime() < friend.birthday.getTime() &&
      friend.birthday.getTime() < twoWeeksAhead.getTime()
    );
  });
  return upcomingDates;
}

export const makeToast = (toast, friend) => {
  toast({
    position: 'top',
    duration: 5000,
    isClosable: true,
    render: () => (
      <Box
        rounded="lg"
        bgColor="purple.600"
        boxShadow="2xlg"
        p="25px"
        mt={{ base: '95px', md: '120px' }}
        w={{ base: '200px', md: '250px' }}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontWeight="bold" fontSize="20px" color="white">{`${
            friend.name
          }'s Birthday is ${formatDateMD(friend.birthday)}!`}</Text>
          <Text color="pink.100">
            {'Time to buy a stashed gift!'}
          </Text>
        </Flex>
      </Box>
    ),
  });
};

// const friends = [
//   {
//     id: '1',
//     userId: '1',
//     name: 'Jenny',
//     birthday: '2000-05-22T07:00:00.000Z',
//     address: '29480 SW Volley St #22, Wilsonville OR 97070',
//   },
//   {
//     id: '2',
//     userId: '1',
//     name: 'Katie',
//     birthday: '1990-12-18T07:00:00.000Z',
//     address: '14715 SW 84th Ct, Tigard OR 97223',
//   },
//   {
//     id: '3',
//     userId: '1',
//     name: 'Jeremy Thompson',
//     birthday: '1986-02-03T08:00:00.000Z',
//     address: '4242 Heaven, Ashland OR 98223',
//   },
// ];

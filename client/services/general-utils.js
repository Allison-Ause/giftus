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

// const friends = [
//   {
//     id: '1',
//     userId: '1',
//     name: 'Jenny',
//     birthday: '1976-05-22T07:00:00.000Z',
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

// set Date to specific year
// when is the NEXT birthday?
// has this date already passed? (<) if so, make next year. If not, make this year

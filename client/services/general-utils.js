export function formatDate(birthday) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  let displayDate;

  const date = new Date(birthday);
  if (birthday === null) {
    displayDate = '';
  } else {
    displayDate = date.toLocaleString('en-US', options);
  }
  return displayDate;
}

export function fiveRecentGifts(gifts) {
  return gifts.slice(0, 5);
}

export function upcomingDates(gifts) {
  const orderedDates = gifts.sort((a, b) => a.birthday - b.birthday);
  console.log(orderedDates);
  return orderedDates;
}

upcomingDates([{}]);

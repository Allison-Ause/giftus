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

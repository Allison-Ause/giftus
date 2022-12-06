const BASE_URL = 'http://localhost:7891/api/v1';

export async function getAllFriends() {
  const res = await fetch(`${BASE_URL}/friends`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (res.ok) {
    const friendList = await res.json();
    return friendList;
  }
}

export async function addFriend(newGift) {
  const res = await fetch(`${BASE_URL}/friends`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGift),
    credentials: 'include',
  });

  if (res.ok) {
    const newGift = await res.json();
    return newGift;
  }
}

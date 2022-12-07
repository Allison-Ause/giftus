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

export async function addFriend(newFriend) {
  console.log('newFriend paramter in utils:', newFriend);

  const res = await fetch(`${BASE_URL}/friends`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFriend),
    credentials: 'include',
  });
  console.log('res from utils:', res);

  if (res.ok) {
    const newFriend = await res.json();
    console.log('newFriend from utils:', newFriend);
    return newFriend;
  }
}

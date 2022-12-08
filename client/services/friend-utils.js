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
  const res = await fetch(`${BASE_URL}/friends`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFriend),
    credentials: 'include',
  });

  if (res.ok) {
    const newFriend = await res.json();
    return newFriend;
  }
}

export async function getFriendById(id) {
  const res = await fetch(`${BASE_URL}/friends/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (res.ok) {
    const friend = await res.json();
    return friend;
  }
}

export async function editFriend(friend) {
  const res = await fetch(`${BASE_URL}/friends/${friend.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(friend),
    credentials: 'include',
  });

  if (res.ok) {
    // updated gift not returning appropriate update
    const updatedFriend = await res.json();
    return updatedFriend;
  }
}

export async function deleteFriend(id) {
  const res = await fetch(`${BASE_URL}/friends/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

const BASE_URL = 'http://localhost:7891/api/v1';

export async function getAllGifts() {
  const res = await fetch(`${BASE_URL}/gifts`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (res.ok) {
    const giftList = await res.json();
    return giftList;
  }
}

export async function addGift(newGift) {
  const res = await fetch(`${BASE_URL}/gifts`, {
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

export async function getById(id) {
  const res = await fetch(`${BASE_URL}/gifts/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (res.ok) {
    const gift = await res.json();
    return gift;
  }
}

export async function editGift(gift) {
  console.log('gift params', gift);
  // gift params are accurate with updated friendId
  const res = await fetch(`${BASE_URL}/gifts/${gift.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gift),
    credentials: 'include',
  });

  if (res.ok) {
    // updated gift not returning appropriate update
    const updatedGift = await res.json();
    console.log('updatedGift in utils', updatedGift);
    return updatedGift;
  }
}

export async function deleteGift(id) {
  const res = await fetch(`${BASE_URL}/gifts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

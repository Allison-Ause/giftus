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

// are these the right headers and stuff?

export async function deleteGift(id) {
  const res = await fetch(`${BASE_URL}/gifts/${id}`, {
    method: 'DELETE',
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(id),
    credentials: 'include',
  });

  // if (res.ok) {
  //   const deletedGift = await res.json();
  //   return deletedGift;
  // }
}

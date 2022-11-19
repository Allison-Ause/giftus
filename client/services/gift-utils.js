const BASE_URL = 'http://localhost:7891/api/v1';

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

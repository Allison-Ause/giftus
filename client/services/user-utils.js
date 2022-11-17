// BACKEND /USERS for signing UP
// BACKEND /USERS/SESSIONS for signing IN

const BASE_URL = 'http://localhost:7891/api/v1';

export async function signUpUser(userInfo) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userInfo),
  });
  const data = await res.json();
  if (res.ok) {
    console.log('data', data);
  } else {
    console.error(data.message);
  }
}

export async function signInUser(userInfo) {
  console.log('userInfo in fetch', userInfo);
}

// BACKEND /USERS for signing IN
// BACKEND /USERS/SESSIONS for signing UP

const BASE_URL = 'http://localhost:7891';

export async function signUpUser(userInfo) {
  console.log('userInfo in fetch', userInfo);
  const res = await fetch(`${BASE_URL}/api/v1/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userInfo),
  });
  const data = await res.json();
  console.log('data', data);
}

// BACKEND /USERS for signing UP
// BACKEND /USERS/SESSIONS for signing IN

const BASE_URL = 'http://localhost:7890';

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

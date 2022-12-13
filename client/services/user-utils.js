// BACKEND /USERS for signing UP
// BACKEND /USERS/SESSIONS for signing IN

const BASE_URL = '/api/v1';

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
    location.replace('/');
  } else {
    console.error(data.message);
  }
}

export async function signInUser(userInfo) {
  const res = await fetch(`${BASE_URL}/users/sessions`, {
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
    location.replace('/');
  } else {
    console.error(data.message);
  }
}

export async function getUser() {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (res.ok) {
    const user = await res.json();
    return user;
  } else {
    console.error(data.message);
  }
}

export async function signOutUser() {
  const res = await fetch(`${BASE_URL}/users/sessions`, {
    method: 'DELETE',
    credentials: 'include',
  });
}

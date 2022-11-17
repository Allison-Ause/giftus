export const getFoos = () => {
  return fetch('/api/v1/foos').then((res) => {
    return res.json().then((json) => {
      return {
        json: json,
        status: res.status,
      };
    });
  });
};

export const deleteFoo = (id) => {
  return fetch(`/api/v1/foos/${id}`, { method: 'DELETE' }).then(
    (res) => {
      return {
        json: null,
        status: res.status,
      };
    }
  );
};

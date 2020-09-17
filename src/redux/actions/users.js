export const setUsers = (users) => ({
  type: "SET_USERS",
  payload: users,
});

export const addUser = (newUser) => ({
  type: "ADD_USER",
  payload: newUser,
});

export const setDataUrl = (url) => ({
  type: "SET_DATA_URL",
  payload: url,
});

export const setLoading = (value) => ({
  type: "SET_LOADING",
  payload: value,
});

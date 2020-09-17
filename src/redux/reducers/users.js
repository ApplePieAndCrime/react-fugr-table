const initialState = {
  users: [],
  dataUrl: "",
  loading: true,
  headers: ["id", "firstName", "lastName", "email", "phone"],
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "ADD_USER":
      return { ...state, users: [action.payload, ...state.users] };
    case "SET_DATA_URL":
      return { ...state, dataUrl: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default users;

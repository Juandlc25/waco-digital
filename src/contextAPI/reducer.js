export const initialState = {
  isAuth: false,
  user: undefined,
  token: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        isAuth: action.isAuth,
        user: action.user,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;

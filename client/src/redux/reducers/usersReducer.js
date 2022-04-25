const initialState = { users: [] };

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_SCORE":
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

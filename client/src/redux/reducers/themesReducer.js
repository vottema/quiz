const initialState = { themes: [] }

export const themesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_THEMES':
      return { ...state, themes: action.payload }

      default:
        return state;
  }
}

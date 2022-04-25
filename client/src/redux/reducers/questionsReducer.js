const initialState = { questions: [] }

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_QUESTIONS':
      return { ...state, questions: action.payload }

    default:
      return state
  }
}

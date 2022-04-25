import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { themesReducer } from "./themesReducer";
import { questionsReducer } from './questionsReducer'

  export const rootReducer = combineReducers({
    themesReducer,
    usersReducer,
    questionsReducer
})

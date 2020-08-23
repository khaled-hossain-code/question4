import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" //this is for local-storage

import postsReducer from "./posts/posts.reducer"
import categoriesReducer from "./categories/categories.reducer"

const persistConfig = {
  key: "root",
  storage,
}

const rootReducer = combineReducers({
  postsStore: postsReducer,
  categoriesStore: categoriesReducer,
})

//this is just a enhanced reducer
export default persistReducer(persistConfig, rootReducer)

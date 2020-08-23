import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./categories.types"

const INITIAL_STATE = {
  categories: {},
}

const categoryReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (!Object.keys(selectAction).includes(type)) return state

  const currentState = _.cloneDeep(state)

  return selectAction[type](currentState, payload)
}

function addCategory(newState, newCategoryData) {
  console.log(newCategoryData)
  const id = uuidv4()
  const newCategory = {
    id,
    name: newCategoryData.name,
    description: newCategoryData.description,
    posts: [],
  }

  newState.categories[id] = newCategory

  return newState
}

function updateCategory(newState, { categoryId, updatedCategoryData }) {
  const oldCategory = newState.categories[categoryId]
  const updatedCategory = {
    ...oldCategory,
    ...updatedCategoryData,
  }

  newState.categories[categoryId] = updatedCategory

  return newState
}

function deleteCategory(newState, categoryId) {
  delete newState.categories[categoryId]

  return newState
}

const selectAction = {
  [ADD_CATEGORY]: addCategory,
  [UPDATE_CATEGORY]: updateCategory,
  [DELETE_CATEGORY]: deleteCategory,
}

export default categoryReducer

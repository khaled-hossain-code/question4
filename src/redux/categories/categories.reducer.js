import _ from "lodash"
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./categories.types"

const INITIAL_STATE = {
  categories: [],
  lastAddedCategory: {},
}

const categoryReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (!Object.keys(selectAction).includes(type)) return state

  const currentState = _.cloneDeep(state)

  return selectAction[type](currentState, payload)
}

function addCategory(newState, newCategoryData) {
  const newCategory = {
    id: newCategoryData.id,
    name: newCategoryData.name,
    description: newCategoryData.description,
    posts: []
  }

  newState.categories.push(newCategory)
  newState.lastAddedCategory = newCategory

  return newState
}

function updateCategory(newState, { categoryId, updatedCategoryData }) {
  const index = newState.categories.findIndex(
    (category) => category.id === categoryId
  )
  const oldCategory = newState.categories[index]
  const updatedCategory = {
    ...oldCategory,
    ...updatedCategoryData,
  }

  newState.categories[index] = updatedCategory

  return newState
}

function deleteCategory(newState, categoryId) {
  const index = newState.categories.findIndex(
    (category) => category.id === categoryId
  )

  delete newState.categories[index]

  return newState
}

const selectAction = {
  [ADD_CATEGORY]: addCategory,
  [UPDATE_CATEGORY]: updateCategory,
  [DELETE_CATEGORY]: deleteCategory,
}

export default categoryReducer

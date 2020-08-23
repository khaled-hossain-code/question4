import { ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "./categories.types"

export const addCategory = (newCategoryData) => ({
  type: ADD_CATEGORY,
  payload: newCategoryData,
})

export const updateCategory = (categoryId, updatedCategoryData) => ({
  type: UPDATE_CATEGORY,
  payload: { categoryId, updatedCategoryData },
})

export const deleteCategory = (categoryId) => ({
  type: DELETE_CATEGORY,
  payload: categoryId,
})

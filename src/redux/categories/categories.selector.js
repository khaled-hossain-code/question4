import { createSelector } from "reselect"

const selectCategory = (state) => state.categoriesStore.categories
const selectCategoryId = (state, categoryId) => categoryId

export const selectCategoryById = createSelector(
  [selectCategory, selectCategoryId],
  (categories, categoryId) =>
    categories.find((category) => category.id === categoryId)
)

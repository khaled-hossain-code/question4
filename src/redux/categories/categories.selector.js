import { createSelector } from "reselect"

const selectPosts = (state) => state.categoriesStore.categories

export const selectAllCategories = createSelector([selectPosts], (categories) =>
  Object.values(categories)
)

export const selectCategoryIds = createSelector([selectPosts], (categories) =>
  Object.keys(categories)
)

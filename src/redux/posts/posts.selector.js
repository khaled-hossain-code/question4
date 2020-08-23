import { createSelector } from "reselect"

const selectPosts = (state) => state.postsStore.posts

export const selectAllPosts = createSelector([selectPosts], (posts) =>
  Object.values(posts)
)

export const selectPostIds = createSelector([selectPosts], (posts) =>
  Object.keys(posts)
)

import { ADD_POST, UPDATE_POST, DELETE_POST } from "./posts.types"

export const addPost = (newPostData) => ({
  type: ADD_POST,
  payload: newPostData,
})

export const updatePost = (postId, updatedPostData) => ({
  type: UPDATE_POST,
  payload: { postId, updatedPostData },
})

export const deletePost = (postId) => ({
  type: DELETE_POST,
  payload: postId,
})

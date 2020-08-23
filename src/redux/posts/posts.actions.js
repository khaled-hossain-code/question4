import { ADD_POST, UPDATE_POST, DELETE_POST } from "./posts.types"

export const addPost = (newPostData) => ({
  type: ADD_POST,
  payload: newPostData,
})

export const updatePost = (postId, updatedPostData) => ({
  type: ADD_POST,
  payload: { postId, updatedPostData },
})

export const removePost = (postId) => ({
  type: ADD_POST,
  payload: postId,
})

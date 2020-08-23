import _ from "lodash"
import { v4 as uuidv4 } from "uuid"
import { ADD_POST, UPDATE_POST, DELETE_POST } from "./posts.types"
import {
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../categories/categories.types"

const INITIAL_STATE = {
  posts: {},
}

const postReducer = (state = INITIAL_STATE, { type, payload }) => {
  if (!Object.keys(selectAction).includes(type)) return state

  const currentState = _.cloneDeep(state)

  return selectAction[type](currentState, payload)
}

function addPost(newState, newPostData) {
  const id = uuidv4()
  const newPost = {
    id,
    title: newPostData.title,
    body: newPostData.body,
    categories: newPostData.categories,
  }

  newState.posts[id] = newPost

  return newState
}

function updatePost(newState, { postId, updatedPostData }) {
  const oldPost = newState.posts[postId]
  const updatedPost = {
    ...oldPost,
    ...updatedPostData,
  }

  newState.posts[postId] = updatedPost

  return newState
}

function deletePost(newState, postId) {
  delete newState.posts[postId]

  return newState
}

function updatePostCategory(newState, { categoryId, updatedCategoryData }) {
  const index = Object.values(newState.posts).findIndex(
    (category) => category.value === categoryId
  )

  if (index === -1) {
    return newState
  }

  const updatedCategory = {
    ...newState.categoriesp[index],
    ...updatedCategoryData,
  }

  newState.categories[index] = updatedCategory

  return newState
}

function deletePostCategory(newState, categoryId) {
  const index = Object.values(newState.posts).findIndex(
    (category) => category.value === categoryId
  )

  if (index === -1) {
    return newState
  }

  newState.categories.splice(index, 1)

  return newState
}

const selectAction = {
  [ADD_POST]: addPost,
  [UPDATE_POST]: updatePost,
  [DELETE_POST]: deletePost,
  [UPDATE_CATEGORY]: updatePostCategory,
  [DELETE_CATEGORY]: deletePostCategory,
}

export default postReducer

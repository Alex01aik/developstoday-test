import { postPost, postComment, getPost, getAllPosts } from '../pages/api/postsAPI'
import { AnyAction } from 'redux'

const SET_POSTS = 'SET_POSTS'
const SET_POST = 'SET_POST'

let initialState = {
  posts: [],
  currentPost: {}
}

const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS: {
      return {...state, posts: action.posts}
    }
    case SET_POST: {
      return {...state, currentPost: action.post}
    }
    default:
      return state
  }
}

export const setPosts = (posts) => ( {type: SET_POSTS, posts: posts.reverse() })
export const setPost = (post) => ( {type: SET_POST, post })

export const getEveryPost = () => {
  return (dispatch) => {
    getAllPosts().then(res => {
      dispatch(setPosts(res))
    })
  }
}
export const getCurrentPost = (postId) => {
  return (dispatch) => {
    getPost(postId).then(res => 
      dispatch(setPost(res))
    )
  }
}
export const postNewPost = (postData) =>
  () => postPost(postData)
export const postNewComment = (commentData) => {
  return (dispatch) => {
    postComment(commentData).then(() => {
      getPost(commentData.postId).then(res => 
        dispatch(setPost(res))
      )
    })
  }
}

export default postsReducer
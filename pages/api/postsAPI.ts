import axios from 'axios'
import { Post, Comment } from '../../interfaces/posts'

const baseUrl = 'https://simple-blog-api.crew.red'

const getPosts =
  async (url: string): Promise<Post> => {
    const serverres = await axios.get(url)
    const res = await serverres.data
    return res
  }

export const delPost =
  async (id: number): Promise<any> => {
    const serverres = await axios.delete(`${baseUrl}/posts/${id}`)
    const res = await serverres.data
    return res
  }

export const getAllPosts =
  async (): Promise<any> => {
    const posts = await getPosts(`${baseUrl}/posts`)
    return posts
  }

export const getLastPosts =
  async (): Promise<Array<Post>> => {
    const posts = await getAllPosts()
    return posts.slice(-5)
  }
export const getPost =
  async (id: number | string | string[]): Promise<Post> => {
    const post = await getPosts(`${baseUrl}/posts/${id}?_embed=comments`)
    return post
  }

export const getAllPostIds =
  async (): Promise<any> => {
    const posts = await getAllPosts()
    return posts.map(post => {
      return {
        params: {
          postId: post.id.toString()
        }
      }
    })
  }

export const postComment =
  async (commentData: Comment): Promise<void> => {
    await axios.post(
      `${baseUrl}/comments`,
      {
        body: commentData.body,
        postId: commentData.postId
      } 
    )
  }
export const postPost =
  async (postData: Post): Promise<void> => {
    await axios.post(
      `${baseUrl}/posts`,
      postData 
    )
  }
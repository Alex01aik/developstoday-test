import React, { useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPost, getAllPostIds } from './../api/postsAPI'
import { Post } from '../../interfaces/posts'
import CommentForm from '../../components/commentForm'
import { useAppSelector } from '../../redux/hooks'
import { getCurrentPost } from '../../redux/postReducer'
import store, { RootState } from '../../redux/store'
import styles from '../../styles/Post.module.css'

const PostPage = () => {
  
    const currentPost: Post = useAppSelector(
      (state: RootState) => 
        state.post.currentPost)

    return (
      <div>
        <div>
          <h1
            className={styles.postTitle}>
            {currentPost.title}
          </h1>
          <p
            className={styles.postBody}>
            {currentPost.body}
          </p>
        </div>
        <div>
          <h3>Comments</h3>
          <CommentForm
            post={currentPost}/>
          {(currentPost.comments)
            ? currentPost.comments.slice(0).reverse().map(comment => (
              <div
                className={styles.comment}
                key={comment.id}>
                <img
                  className={styles.commentator}
                  src='/commentator.png' />
                <div
                  className={styles.commentBody}>
                  {comment.body}
                </div>
              </div>
            ))
            : <></>
        }
        </div>
      </div>
    )
}

export const getStaticPaths: GetStaticPaths  =
  async () => {
    return {
      paths: await getAllPostIds(),
      fallback: false
    }
  }

export const getStaticProps: GetStaticProps =
  async ({ params }) => {
    const post = await getPost(params.postId)
    store.dispatch(getCurrentPost(post.id))
    return { props: {} }
  }

export default PostPage

import { useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPost, getAllPostIds } from './../api/postsAPI'
import { Post } from '../../interfaces/posts'
import CommentForm from '../../components/commentForm'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getCurrentPost } from '../../redux/postReducer'
import { RootState } from '../../redux/store'
import styles from '../../styles/Post.module.css'

const PostPage = ({
    postProp
  }:{
    postProp: Post
  }) => {
    
    const dispatch = useAppDispatch()
    const currentPost = useAppSelector(
      (state: RootState) => 
        state.post.currentPost)

    useEffect((): any => {
      dispatch(getCurrentPost(postProp.id))
    }, [])

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
    const postProp = await getPost(params.postId)
    return { props: { postProp } }
  }

export default PostPage

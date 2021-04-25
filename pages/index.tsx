import React, { useEffect } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getLastPosts } from './api/postsAPI'
import { Post } from '../interfaces/posts'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import store, { RootState } from '../redux/store'
import { getEveryPost, setPosts } from '../redux/postReducer'
import styles from '../styles/Posts.module.css'

const LatestPosts = ({
  posts
  }: {
    posts: Array<Post>
  }) => {
    
    const dispatch = useAppDispatch()
    const storeposts = useAppSelector(
      (state: RootState) => 
        state.post.posts)
    const localposts = (storeposts.length) ? storeposts : posts
    return (
      <>
        <h1>Latest Posts</h1>
        <ul className={styles.posts}>
          {localposts.map(item => (
            <li
              key={item.id}
              className={styles.post}>
              <h3>
                <Link
                  href={'/posts/postId}'}
                  as={`/posts/${item.id}`}>
                  {item.title}
                </Link>
              </h3>
              <p
                className={styles.postBody}>
                {item.body}
                </p>
            </li>
          ))}
        </ul>
        {( storeposts.length > 5 )
          ? <></>
          : <button
              onClick={() => dispatch(getEveryPost())}>
              GET ALL POSTS
            </button>}
      </>
    )
}

export const getStaticProps: GetStaticProps =
  async () => {
    const postsProps = await getLastPosts()
    store.dispatch(setPosts(postsProps))
    const posts = store.getState().post.posts
    return { props: { posts } }
  }

export default LatestPosts
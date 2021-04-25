import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getAllPosts, getLastPosts } from './api/postsAPI'
import { Post } from '../interfaces/posts'
// import { useAppDispatch, useAppSelector } from '../redux/hooks'
// import { RootState } from '../redux/store'
// import { getEveryPost, setPosts } from '../redux/postReducer'
import styles from '../styles/Posts.module.css'

const LatestPosts = ({
  postsProps
  }: {
    postsProps: Array<Post>
  }) => {
    
    // const dispatch = useAppDispatch()
    // const posts = useAppSelector(
    //   (state: RootState) => 
    //     state.post.posts)

    const [posts, setPosts] = useState([])
    useEffect((): any => {
      getAllPosts().then(res => setPosts(res.reverse()))
      // dispatch(setPosts(postsProps))

    }, [])
    
    return (
      <>
        <h1>Latest Posts</h1>
        <ul className={styles.posts}>
          {posts.map(item => (
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
        {/* {( posts.length > 5 )
          ? <></>
          : <button
              onClick={() => dispatch(getEveryPost())}>
              GET ALL POSTS
            </button>} */}
      </>
    )
}

export const getStaticProps: GetStaticProps =
  async () => {
    const posts = await getAllPosts()
    return { props: { postsProps: posts.reverse() } }
  }

export default LatestPosts
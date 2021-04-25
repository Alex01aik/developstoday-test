import React from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1><Link href={'/'}>DevelopsToday MVP Blog</Link></h1>
    </header>
  )
}

export default Header

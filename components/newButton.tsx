import React from 'react'
import Link from 'next/link'
import styles from '../styles/NewButton.module.css'

const NewButton: React.FC = () => {
  return (
		<div className={styles.newButton}>
			<Link href={'/posts/new'}>
				New
			</Link>
		</div>
  )
}

export default NewButton

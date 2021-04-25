import React from 'react'
import { Provider } from 'react-redux'
import Header from '../components/header'
import NewButton from '../components/newButton'
import store from '../redux/store'

const MainLayuot: React.FC = 
	({ children }: { children: React.ReactNode }) => {
		return (
			<Provider store={store}>
				<Header />
				<NewButton />
				<main>
					{children}
				</main>
			</Provider>
    )
}

export default MainLayuot

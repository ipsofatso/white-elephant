// polyfills (thought we didnt need these anymore?)
import 'regenerator-runtime/runtime'

// core react
import React, {
	//Fragment
	useState,
} from 'react'
import { render } from 'react-dom'

// redux
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices'

import DataHandler from './components/data-handler'
import Header from './components/header'
import Players from './components/players'

import './app.scss'

const store = configureStore({ reducer: rootReducer })

// App. Setup shared state, and routing.
export function App() {
	const [ currentTab, setCurrentTab ] = useState( 1 )

    return (
		<Provider store={ store }>
			<DataHandler />
			<Header
				current={ currentTab }
				setCurrent={ setCurrentTab }
			/>

			<section className="content">
				{ currentTab === 0 &&
					<p>board</p>
				}

				{ currentTab === 1 &&
					<Players />
				}

				{ currentTab === 2 &&
					<p>log</p>
				}
			</section>
		</Provider>
    );
}


// launch.
render(
	<App />,
	document.getElementById('white-elephant-app')
);
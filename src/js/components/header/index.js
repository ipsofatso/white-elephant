import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { gameSelector, toggleShowGiver } from '../../slices/game'

import './index.scss'

function Header( props ) {
	const dispatch = useDispatch()
	const {
		showGiver
    } = useSelector( gameSelector )
    const tabInfo = [
        {
            label: "Board",
        },
        {
            label: "Players",
        },
        {
            label: "Gifts"
        },
        //{
        //    label: "Log",
        //},
    ]

    const handleTabClick = ( e ) => {
        props.setCurrent( parseInt( e.currentTarget.attributes[ "data-index" ].value ) )
    }

    const generateTabs = () => {
        let markup = []

        for( let index in tabInfo ) {
            markup.push(
                <Tab
                    key={ index }
                    label={ tabInfo[ index ].label }
                    onClick={ handleTabClick }
                    value={ parseInt( index ) }
                    data-index={ parseInt( index ) }
                />
            )
        }

        return markup
    }

    return (
        <AppBar
            className="header"
            position="static"
        >
            <Tabs
                value={ parseInt( props.current ) }
            >
                <Tab
                    className="icon"
                    label={ "🐟♻️" }
                    onClick={ handleTabClick }
                    value={ -1 }
                    data-index={ -1 }
                />

                { generateTabs() }

				<FormControlLabel
					control={
						<Checkbox
							checked={ showGiver }
							onChange={
								() => { dispatch( toggleShowGiver() ) }
							}
						/>
					}
					label="Show Giver"
				/>
            </Tabs>
        </AppBar>
    )
}

export default Header
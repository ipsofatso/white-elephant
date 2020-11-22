import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import './index.scss'

function Header( props ) {
    const tabInfo = [
        {
            label: "Board",
        },
        {
            label: "Players",
        },
        {
            label: "Log",
        },
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
                    label={ "🐟♻️" }
                    value={ -1 }
                    className="icon"
                />

                { generateTabs() }
            </Tabs>
        </AppBar>
    )
}

export default Header
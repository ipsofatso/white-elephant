import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addGameData, gameSelector } from '../slices/game'

function DataHandler() {
    const dispatch = useDispatch()
    const { players, gifts } = useSelector( gameSelector ) 

    useEffect( () => {
        checkForStoredGameData()
    }, [] )

    useEffect( () => {
        storeGameData()
    }, [ players, gifts ] )

    const checkForStoredGameData = () => {
        const playerData = window.localStorage.getItem( 'players' ) 
        const giftData = window.localStorage.getItem( 'gifts' ) 

        dispatch( addGameData( {
            players: JSON.parse( playerData ),
            gifts: JSON.parse( giftData )
        } ) )
    }

    const storeGameData = () => {
        window.localStorage.setItem( 'players', JSON.stringify( players ) ) 
        window.localStorage.setItem( 'gifts', JSON.stringify( gifts ) )
    }

    return null
}

export default DataHandler
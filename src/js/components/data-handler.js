import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addGameData, gameSelector } from '../slices/game'

function DataHandler() {
    const dispatch = useDispatch()
    const { players, gifts, order } = useSelector( gameSelector ) 

    useEffect( () => {
        checkForStoredGameData()
    }, [] )

    useEffect( () => {
        storeGameData()
    }, [ players, gifts, order ] )

    const checkForStoredGameData = () => {
        const playerData = window.localStorage.getItem( 'players' ) 
        const giftData = window.localStorage.getItem( 'gifts' ) 
        const orderData = window.localStorage.getItem( 'order' ) 

        dispatch( addGameData( {
            players: JSON.parse( playerData ),
            gifts: JSON.parse( giftData ),
            order: JSON.parse( orderData )
        } ) )
    }

    const storeGameData = () => {
        window.localStorage.setItem( 'players', JSON.stringify( players ) ) 
        window.localStorage.setItem( 'gifts', JSON.stringify( gifts ) )
        window.localStorage.setItem( 'order', JSON.stringify( order ) )
    }

    return null
}

export default DataHandler
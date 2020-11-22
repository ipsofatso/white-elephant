import React from 'react'
import { useDispatch } from 'react-redux'

import GravatarPlayer from '../../ui-components/gravatar-player'
import { removePlayer } from '../../../slices/game'

import './index.scss'

function Player( props ) {
    const dispatch = useDispatch()

    const handleRemove = () => {
        console.log('handle remove')

        dispatch( removePlayer( props.player.id ) )
    }

    return(
        <li className="player">
            <GravatarPlayer player={ props.player } />
            { props.player.name }

            <a onClick={ handleRemove } >remove</a>
        </li>
    )
}

export default Player
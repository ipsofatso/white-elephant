import React from 'react'
import { useDispatch } from 'react-redux'

import GravatarPlayer from '../../ui-components/gravatar-player'
import { removePlayer } from '../../../slices/game'

import './index.scss'

function Player( props ) {
    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch( removePlayer( props.player.id ) )
	}

    return(
        <li className="player">
            <GravatarPlayer player={ props.player } />

            <h3>
				{ props.player.name }
            </h3>

			<div>
				<a onClick={ handleRemove } >remove</a>
			</div>
        </li>
    )
}

export default Player
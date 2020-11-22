import React from 'react'
import { useSelector } from 'react-redux'

import { gameSelector } from '../../../slices/game'
import Player from '../player'

import './index.scss'

function PlayerList() {
    const { players } = useSelector( gameSelector )

    const generatePlayers = () => {
        let markup = []

        for( let player of players ) {
            markup.push(
                <Player
                    key={ player.id }
                    player={ player }
                />
            )
        }

        return markup
    }

    return (
        <div className="player-list-module">
            <h2>
                player list
            </h2>

            <ul>
                { generatePlayers() }
            </ul>
        </div>
    )
}

export default PlayerList
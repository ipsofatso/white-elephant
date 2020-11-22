import React from 'react'
import { useSelector } from 'react-redux'

import { gameSelector } from '../../slices/game'
import BoardGift from './gift'
import BoardPlayer from './player'

import { ItemTypes } from './itemTypes'

function Board() {
    const { gifts, players } = useSelector( gameSelector )

    const generatePileGifts = () => {
        let markup = []

        for( let gift of gifts ) {
            const hasRcvr = gift.rcvrID != null

            !hasRcvr && markup.push(
                <BoardGift
                    gift={ gift }
                    isDropped={ handleIsDropped }
                    key={ gift.giverID }
                    type={ ItemTypes.GIFT }
                />
            )
        }

        return markup
    }

    const generatePlayers = () => {
        let markup = []

        for( let player of players ) {
            markup.push(
                <BoardPlayer
                    accept={ ItemTypes.GIFT }
                    key={ player.id }
                    lastDroppedItem={ null }
                    onDrop={ handleDrop }
                    player={ player }
                />
            )
        }

        return markup
    }

    const handleDrop = ( i, x ) => {
        console.log('handle drop, item: ', i, ', x: ', x)
    }

    const handleIsDropped = ( x ) => {
        console.log('handle is dropped, x: ', x)
    }

    return (
        <section className="board-module">
            <section className="gift-pile">
                gift pile

                { generatePileGifts() }
            </section>

            <section className="players">
                { generatePlayers() }
            </section>
        </section>
    )
}

export default Board
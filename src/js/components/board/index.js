import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { assignGift, gameSelector } from '../../slices/game'
import BoardGift from './gift'
import BoardPlayer from './player'

import { ItemTypes } from './itemTypes'

import './index.scss'

function Board() {
    const dispatch = useDispatch()
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
                    handleIsDropped={ handleIsDropped }
                    key={ player.id }
                    lastDroppedItem={ null }
                    name={ player.id }
                    onDrop={ ( gift ) => { handleDrop( player.id, gift ) } }
                    player={ player }
                />
            )
        }

        return markup
    }

    const handleDrop = ( rcvr, gift ) => {
        const payload = {
            giftID: gift.name,
            rcvrID: rcvr
        }

        dispatch( assignGift( payload ) )
    }

    const handleIsDropped = ( x ) => {
        console.log('handle is dropped, x: ', x)
    }

    return (
        <section className="board-module">
            <section className="gift-pile">
                <h1>
					gift pile
                </h1>

                { generatePileGifts() }
            </section>

            <section className="players">
                { generatePlayers() }
            </section>
        </section>
    )
}

export default Board
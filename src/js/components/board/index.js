import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import { assignGift, gameSelector, removeRcvrFromGift } from '../../slices/game'
import BoardGift from './gift'
import BoardPlayer from './player'
import PlayerOrderControl from './player-order-control'

import { ItemTypes } from './itemTypes'

import './index.scss'

function Board() {
    const dispatch = useDispatch()
	const { gifts, players } = useSelector( gameSelector )
	let pileClassList = [ "gift-pile" ]

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
		dispatch( removeRcvrFromGift( x.name ) )
	}

	const [{ isOver }, pile] = useDrop({
		accept: ItemTypes.GIFT,
        drop: handleIsDropped,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
	});

	if( isOver ) {
		pileClassList.push( 'is-over' )
	}

    return (
        <section className="board-module">
            <section
				className="gift-pile"
				ref={ pile }
			>
				<h1>
					gift pile
				</h1>

				{ generatePileGifts() }
            </section>

            <section className="players">
                { generatePlayers() }
            </section>

			<PlayerOrderControl />
        </section>
    )
}

export default Board
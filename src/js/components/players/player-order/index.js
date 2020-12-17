import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { gameSelector, updateOrder } from '../../../slices/game'
import Button from '@material-ui/core/Button'
import CasinoIcon from '@material-ui/icons/Casino'

import './index.scss'

function PlayerOrder() {
    const dispatch = useDispatch()
    const { order, players } = useSelector( gameSelector )

    const generateNewOrder = () => {
        const available = players.length
        let indexArray = []
        let orderedArray = []
        const min = 0

        // make array of indexes
        for( let i = 0; i < available; i++ ) {
            indexArray.push(i)
        }

        // count down
        for( let i = available; i > 0; i-- ) {
            const targetIndex = Math.floor( Math.random() * ( i - min ) + min )
            const targetValue = indexArray[ targetIndex ]

            orderedArray.push( targetValue )
            indexArray.splice( targetIndex, 1 )
        }

        dispatch( updateOrder( orderedArray ) )
    }

    const generatePlayerOrderList = () => {
        let markup = []

        for( let i of order ) {
            const thisPlayer = players[ i ]

            markup.push(
                <li key={ thisPlayer.id }>
                    { thisPlayer.name }
                </li>
            )
        }

        return markup
    }

    return (
        <div className="player-order-module">
            <h2>
                player order
            </h2>

			<Button
                children={ "generate order" }
                endIcon={ <CasinoIcon /> }
                onClick={ generateNewOrder }
            />

            { order &&
                <ol>
                    { generatePlayerOrderList() }
                </ol>
            }
        </div>
    )
}

export default PlayerOrder
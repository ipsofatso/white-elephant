import React from 'react'

import getPlayerById from '../../ui-components/get-player-by-id'

import './index.scss'

function GiftDetail( props ) {
    const giver = getPlayerById( props.gift.giverID )
    const rcvr = getPlayerById( props.gift.rcvrID ) || null

    const generateHistory = () => {
        let markup = []

        for( let i in props.gift.history ) {
            const thisHistPlayer = getPlayerById( props.gift.history[ i ] )

            markup.push(
                <span key={ i }>
                    { thisHistPlayer.name }
                </span>
            )
        }

        return markup
    }


    return (
        <li className="gift-detail">
            <dl>
                <dt>giver:</dt>
                <dd>
                    { giver.name }
                </dd>

                <dt>receiver:</dt>
                <dd>
                    { rcvr && rcvr.name }
                </dd>

                <dt>history:</dt>
                <dd>{ generateHistory() }</dd>
            </dl>
        </li>
    )
}

export default GiftDetail
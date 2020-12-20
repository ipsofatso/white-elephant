import React from 'react'
import { useSelector } from 'react-redux'

import { gameSelector } from '../../slices/game'
import GiftDetail from './gift-detail'

import './index.scss'

function Gifts() {
    const {
        gifts,
    } = useSelector( gameSelector )

    console.log('gifts: ', gifts)

    return (
        <section className="gifts-module">
            <ul>
                {
                    gifts.length > 0 && gifts.map( gift =>
                        <GiftDetail
                            gift={ gift }
                            key={ gift.giverID }
                        />
                    )
                }
            </ul>
        </section>
    )
}

export default Gifts
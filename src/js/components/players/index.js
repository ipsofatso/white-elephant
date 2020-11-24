import React from 'react'

import AddPlayer from './add-player'
import PlayerList from './player-list'
import PlayerOrder from './player-order'

import './index.scss'

function Players() {
    return (
        <section className="players-section">
            <AddPlayer />

			<div className="columns">
				<PlayerList />
				<PlayerOrder />
			</div>
        </section>
    )
}

export default Players
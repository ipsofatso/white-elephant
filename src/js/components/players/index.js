import React from 'react'

import AddPlayer from './add-player'
import PlayerList from './player-list'
import PlayerOrder from './player-order'

function Players() {
    return (
        <section className="players-section">
            <AddPlayer />
            <PlayerList />
            <PlayerOrder />
        </section>
    )
}

export default Players
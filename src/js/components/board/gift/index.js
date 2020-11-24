import React from 'react'
import { useDrag } from 'react-dnd'

import getPlayerById from '../../ui-components/get-player-by-id'

import './index.scss'

function BoardGift( props ) {
	const player = getPlayerById( props.gift.giverID )

    const [{ opacity }, drag] = useDrag({
        item: {
            name: props.gift.giverID,
            type: props.type
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });

    return (
        <div
            className="board-gift"
			ref={ drag }
			style={{ opacity }}
        >
			<div className="tag">
				{ player.name }
			</div>
        </div>
    )
}

export default BoardGift
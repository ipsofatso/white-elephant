import React from 'react'
import { useDrag } from 'react-dnd'

import getPlayerById from '../../ui-components/get-player-by-id'
import { bucket } from '../../../data/constants'

import './index.scss'

function BoardGift( props ) {
	const player = getPlayerById( props.gift.giverID )
	const hasImage = Boolean( props.gift.image )
    let classList = [ "board-gift" ]
	let url = "#"

	if( hasImage ) {
		url = `${ bucket }${ props.gift.image }`
		classList.push( "has-image" )
	}

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
            className={ classList.join( " " ) }
			ref={ drag }
			style={{
				opacity,
				backgroundImage: `url(${ url })`
			}}
        >
			<div className="tag">
				{ player.name }
			</div>
        </div>
    )
}

export default BoardGift
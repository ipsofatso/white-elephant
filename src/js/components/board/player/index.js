import React from 'react'
import { useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { filter } from 'lodash'

import BoardGift from '../gift'
import FauxGift from '../faux-gift'
import { gameSelector } from '../../../slices/game'
import GravatarPlayer from '../../ui-components/gravatar-player'
import { ItemTypes } from '../itemTypes'

import './index.scss'

function BoardPlayer( props ) {
    const { gifts } = useSelector( gameSelector )
	const hasGift = filter( gifts, { rcvrID: props.player.id })[ 0 ] || false
	let classList = [ "board-player" ]

    const [{ isOver }, drop] = useDrop({
        accept: props.accept,
        drop: props.onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
	});

	isOver && classList.push( 'is-over' )

    return(
        <div
            className={ classList.join( ' ' ) }
            ref={ drop }
        >
            <GravatarPlayer player={ props.player } />
            <p>{ props.player.name }</p>

            { hasGift &&
                <BoardGift
                    gift={ hasGift }
                    isDropped={ props.handleIsDropped }
                    key={ hasGift.giverID }
                    type={ ItemTypes.GIFT }
                />
            }

			{ !hasGift &&
				<FauxGift />
			}
        </div>
    )
}

export default BoardPlayer
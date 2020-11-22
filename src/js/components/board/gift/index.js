import React from 'react'

import { useDrag } from 'react-dnd'

function BoardGift( props ) {

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
        >
            gift giver { props.gift.giverID }

            <p>
                { opacity }
            </p>
        </div>
    )
}

export default BoardGift
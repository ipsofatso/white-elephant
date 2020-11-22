import React from 'react'
import { useDrop } from 'react-dnd'

function BoardPlayer( props ) {

    const [{ isOver }, drop] = useDrop({
        accept: props.accept,
        drop: props.onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return(
        <div
            className="board-player"
            ref={ drop }
        >
            <p>{ props.player.name }</p>

            { isOver &&
                <p>over!</p>
            }
        </div>
    )
}

export default BoardPlayer
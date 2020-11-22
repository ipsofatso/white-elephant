import React from 'react'

function GravatarPlayer( props ) {
    return (
        <img src={ `https://www.gravatar.com/avatar/${ props.player.id }?d=retro` } />
    )
}

export default GravatarPlayer
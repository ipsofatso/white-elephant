import { useSelector } from 'react-redux'
import { filter } from 'lodash'

import { gameSelector } from '../../slices/game'

function getPlayerById( id ) {
    const { players } = useSelector( gameSelector )
    const thisPlayer = filter( players, { id } )[ 0 ]

    return thisPlayer
}

export default getPlayerById
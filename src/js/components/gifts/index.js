import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { gameSelector, toggleShowGiver } from '../../slices/game'
import GiftDetail from './gift-detail'

import './index.scss'

function Gifts() {
	const dispatch = useDispatch()
    const {
        gifts,
		showGiver
    } = useSelector( gameSelector )

    console.log('gifts: ', gifts)

    return (
        <section className="gifts-module">
			<div>
				<FormControlLabel
					control={
						<Checkbox
							checked={ showGiver }
							onChange={
								() => { dispatch( toggleShowGiver() ) }
							}
						/>
					}
					label="Show Giver"
				/>
			</div>

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
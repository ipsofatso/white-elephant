import React, { Fragment, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import getPlayerById from '../../ui-components/get-player-by-id'
import {
	removeRcvrFromGift,
	setGiftUrl,
	gameSelector
} from '../../../slices/game'
import { bucket, giftImages } from '../../../data/constants'

import './index.scss'

function GiftDetail( props ) {
	const dispatch = useDispatch()
	const select = useRef()
	const { showGiver } = useSelector( gameSelector )
    const giver = getPlayerById( props.gift.giverID )
	const rcvr = getPlayerById( props.gift.rcvrID ) || null
	const hasImage = Boolean( props.gift.image )
	let classList = [ "gift-detail" ]

	hasImage && classList.push( "has-image" )

    const generateHistory = () => {
        let markup = []

        for( let i in props.gift.history ) {
            const thisHistPlayer = getPlayerById( props.gift.history[ i ] )

            markup.push(
				<span
					className="history-item"
					key={ i }
				>
                    { thisHistPlayer.name }
                </span>
            )
        }

        return markup
	}

	const handleImageSet = () => {
		dispatch( setGiftUrl( {
			giverID: props.gift.giverID,
			image: select.current.value
		} ) )
	}

	const handleRemove = () => {
		dispatch( removeRcvrFromGift( props.gift.giverID ) )
	}

    return (
        <li className={ classList.join( " " ) }>
			{ !hasImage &&
				<div className="no-image"> no image</div>
			}

			{ hasImage &&
				<div
					className="gift-image"
					style={ {
						backgroundImage: `url(${ bucket }${ props.gift.image })`
					} }
				/>
			}

			<dl>
				<dt>
					image:
				</dt>

				<dd>
					<select
						ref={ select }
					>
						<option
							value="null"
						>
							none
						</option>

						{ giftImages.map(
							i => {
								return (
									<option
										key={ i }
										selected={ props.gift.image === i }
										value={ i }
									>
										{ i }
									</option>
								)
							}
						) }
					</select>

					<a
						onClick={ handleImageSet }
					>
						set
					</a>
				</dd>
			</dl>

            <dl>
				{ showGiver &&
					<Fragment>
						<dt>giver:</dt>
						<dd>
							{ giver.name }
						</dd>
					</Fragment>
				}

                <dt>receiver:</dt>
                <dd>
                    { rcvr && rcvr.name }

					{ rcvr &&
						<a onClick={ handleRemove }>
							remove
						</a>
					}
                </dd>


                <dt>history:</dt>
                <dd>{ generateHistory() }</dd>
            </dl>
        </li>
    )
}

export default GiftDetail
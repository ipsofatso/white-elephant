import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { gameSelector, setOrderIndex } from '../../../slices/game'

import './index.scss'

function PlayerOrderControl() {
	const dispatch = useDispatch()
	const { order, orderIndex, players } = useSelector( gameSelector )
	const limit = order.length - 1

	const generatePlayerList = () => {
		let prevI = orderIndex - 1
		let nextI = orderIndex + 1
		let three = []
		let names = []

		if( prevI < 0 ) {
			prevI = limit
		}

		if( nextI > limit ) {
			nextI = 0
		}

		three = [ prevI, orderIndex, nextI ]

		for( let ind of three ) {
			names.push(
				<li key={ ind }>
					{ players[ order[ ind ] ].name }
				</li>
			)
		}

		return names
	}

	const changeOrderIndex = ( dir ) => {
		let val = orderIndex + dir

		console.log('orderIndex: ', orderIndex)
		console.log('val: ', val)

		if ( val < 0 ) {
			val = order.length - 1
		}

		if( val > limit ) {
			val = 0
		}
		dispatch( setOrderIndex( val ) )
	}

	return (
		<div className="player-order-control-module">
			<a
				onClick={ ()=>{ changeOrderIndex( -1 ) } }
			>
				prev
			</a>

			<ul>
				{ ( players && order.length ) && generatePlayerList() }
			</ul>

			<a
				onClick={ ()=>{ changeOrderIndex( 1 ) } }
			>
				next
			</a>
		</div>
	)
}

export default PlayerOrderControl
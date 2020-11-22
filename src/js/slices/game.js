import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const initialState = {
	gifts: [],
	order: [],
	players: [],
}

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		addGameData: ( state, { payload } ) => {
			state.players = payload.players
			state.gifts = payload.gifts
			state.order = payload.order
		},
		addPlayer: ( state, { payload } ) => {
			const seed = `${ payload.toLowerCase() }${ Math.random() * 100 }`
			const hash = () => {
				let hash = 0
				let chr = ""

				for ( let i of seed ) {
					chr   = seed.charCodeAt( i );
					hash  = ( ( hash << 5 ) - hash ) + chr;
					hash |= 0; // Convert to 32bit integer
				}
				return hash;
			}
			const id = Math.abs( hash() )

			state.players.push( {
				name: payload,
				id: id,
				donorCount: 0
			} )

			state.gifts.push( {
				giverID: id,
				rcvrID: null,
				history: []
			} )
		},
		removePlayer: ( state, { payload } ) => {
			const updPlayers = _.reject( state.players, { id: payload } )
			const updGifts = _.reject( state.gifts, { giverID: payload } )
			// need to remove any gifts they are rcvr

			state.players = updPlayers
			state.gifts = updGifts
		},
		updateOrder: ( state, { payload } ) => {
			state.order = payload	
		}
	}
})

// actions
export const {
	addGameData,
	addPlayer,
	removePlayer,
	updateOrder
} = gameSlice.actions

// selector
export const gameSelector = state => state.game

// reducer
export default gameSlice.reducer
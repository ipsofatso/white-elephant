import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

export const initialState = {
	gifts: [],
	order: [],
	players: [],
	showGiver: false
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
				history: [],
				image: null
			} )
		},
		assignGift: ( state, { payload } ) => {
			const giftID = state.gifts.findIndex( ( e, i ) => {
				return state.gifts[ i ].giverID === payload.giftID
			} )
			const thisGift = state.gifts[ giftID ]

			thisGift.rcvrID && thisGift.history.push( thisGift.rcvrID )
			thisGift.rcvrID = payload.rcvrID

			state.gifts[ giftID ] = thisGift
		},
		removePlayer: ( state, { payload } ) => {
			const updPlayers = _.reject( state.players, { id: payload } )
			const updGifts = _.reject( state.gifts, { giverID: payload } )
			// need to remove any gifts they are rcvr

			state.order = []
			state.gifts = updGifts
			state.players = updPlayers
		},
		removeRcvrFromGift: ( state, { payload } ) => {
			const ind = state.gifts.findIndex( ( g ) => { return g.giverID === payload } )

			state.gifts[ ind ].rcvrID = null
		},
		setGiftUrl: ( state, { payload } ) => {
			const ind = _.findIndex(
				state.gifts,
				{ giverID: payload.giverID }
			)

			console.log('ind: ', ind)
			console.log('payload: ', payload)

			state.gifts[ ind ].image = payload.image
		},
		toggleShowGiver: ( state ) => {
			state.showGiver = !state.showGiver
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
	assignGift,
	removePlayer,
	removeRcvrFromGift,
	setGiftUrl,
	toggleShowGiver,
	updateOrder
} = gameSlice.actions

// selector
export const gameSelector = state => state.game

// reducer
export default gameSlice.reducer
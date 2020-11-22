import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import TextField from '@material-ui/core/TextField'

import { addPlayer } from '../../../slices/game'

import './index.scss'

function AddPlayer() {
    const dispatch = useDispatch()
    const input = useRef()

    const handleAddPlayer = () => {
        dispatch( addPlayer( input.current.value ) )

        input.current.value = ""
    }

    return (
        <div className="add-player-module">
            <TextField
                inputRef={ input }
                label="Add New Player"
                defaultValue=""
                placeholder="New Player Name"
            />

            <Button
                children={ "Add Player" }
                endIcon={ <PersonAddIcon /> }
                onClick={ handleAddPlayer }
            />
        </div>
    )
}

export default AddPlayer
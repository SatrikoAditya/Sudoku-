import {SET_BOARD} from '../action-type'
import axios from 'axios'

export function setBoard(payload) {
    return {
        type: SET_BOARD,
        payload
    }
}

export function createBoard() {
    return (dispatch) => {
        axios.get('https://sugoku.herokuapp.com/board')
        .then(({data}) => {
            dispatch(setBoard(data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

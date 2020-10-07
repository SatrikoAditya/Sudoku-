import {SET_BOARD, UPDATE_BOARD, SOLVE_BOARD, AUTOMATIC_SOLVE, PLAY} from '../action-type'
import axios from 'axios'

export function setBoard(payload) {
    return {
        type: SET_BOARD,
        payload
    }
}

export function createBoard(level) {
    return (dispatch) => {
        axios.get(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
        .then(({data}) => {
            dispatch(setBoard(data.board))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export function updateBoard(board) {
    return {
        type: UPDATE_BOARD,
        payload: board
    }
}

export function checkSolve(board) {
    return (dispatch) => {
        const data = {board}
        const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
        const encodeParams = (params) => 
            Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');
        axios({
            method: 'POST',
            url: 'https://sugoku.herokuapp.com/validate',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data: encodeParams(data)
        })
        .then(result => {
            if(result.data.status === 'solved') {
                dispatch({
                    type: SOLVE_BOARD,
                    payload: true
                })
            } else {
                dispatch({
                    type: SOLVE_BOARD,
                    payload: false
                })
            }
        })
    }
}

export function autoSolve(board) {
    return (dispatch) => {
        const data = {board}
        const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
        const encodeParams = (params) => 
            Object.keys(params)
            .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
            .join('&');
        axios({
            method: 'POST',
            url: 'https://sugoku.herokuapp.com/solve',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            data: encodeParams(data)
        })
        .then(result => {
            dispatch({
                type: AUTOMATIC_SOLVE,
                payload: result.data.solution
            })
        })
        .catch(err => {
            console.log(err)
        })
    }   
}

export function playGame() {
    return {
        type: PLAY
    }
}

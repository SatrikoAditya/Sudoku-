import {SET_BOARD, UPDATE_BOARD, SOLVE_BOARD, AUTOMATIC_SOLVE, PLAY} from '../action-type'

const initialState = {
    board: [],
    checkBoard: [],
    loading: true,
    automaticSolve: false,
    isSolved: false
}

function reducers(state = initialState, action) {
    if(action.type === SET_BOARD) {
        return {
            ...state,
            board: action.payload,
            checkBoard: action.payload,
            loading: false
        }
    } if(action.type === UPDATE_BOARD) {
        return {
            ...state,
            board: action.payload
        }
    } if(action.type === SOLVE_BOARD) {
        return {
            ...state,
            isSolved: action.payload
        }
    } if(action.type === AUTOMATIC_SOLVE) {
        return {
            ...state,
            board: action.payload,
            automaticSolve: true,
            isSolved: true
        }
    } if(action.type === PLAY) {
        return {
            ...state,
            board: [],
            checkBoard: [],
            automaticSolve: false,
            isSolved: false,
            loading: true
        }
    }
    return state
}

export default reducers


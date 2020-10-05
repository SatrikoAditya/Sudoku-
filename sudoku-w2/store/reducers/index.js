import {SET_BOARD} from '../action-type'
const initialState = {
    board: []
}

function reducers(state = initialState, action) {
    if(action.type === SET_BOARD) {
        return {
            ...state,
            board: action.payload
        }
    }
}

export default reducers


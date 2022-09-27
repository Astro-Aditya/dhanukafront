import { GET_FARMER } from '../actions/constants'

const initialState = {}

export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_FARMER:
            return payload
        default:
            return state
    }
}
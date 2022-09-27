import { FILTER_TICKET } from '../actions/constants'

const initialState = {}

export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case FILTER_TICKET:
            return payload 
        default:
            return state
    }
}
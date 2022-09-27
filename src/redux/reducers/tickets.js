import {GET_TICKET, GET_TICKET_BY_ID, GET_TICKET_BY_NUMBER } from '../actions/constants'

const initialState = {}

export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_TICKET:
            return {...state, ...payload}
        case GET_TICKET_BY_NUMBER:
            return payload 
        case GET_TICKET_BY_ID:
            return [payload] 
        default:
            return state
    }
}
import { GET_PROD } from '../actions/constants'

const initialState = []

export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_PROD:
            return payload
 
        default:
            return state
    }
}
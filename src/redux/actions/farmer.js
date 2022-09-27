import axios from 'axios'
import { URL } from '../../components/url'
import { setAlert } from './alert'
import { GET_FARMER } from './constants'

export const getFarmer = (mobileNo) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({mobileNo:mobileNo})

    try{
        // const res = await axios.post('http://localhost:5000/farmer',body, config)
        const res = await axios.post(`${URL}/farmer`,body, config)
        
        dispatch({
            type: GET_FARMER,
            payload: res.data.data
        })

    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            console.log(errors)
            // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

// export const postTickets = (postData) => async (dispatch) => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     console.log('postdata======',postdata)

//     const body = JSON.stringify(postData)

//     try{
//         console.log('body======',body)
//         // const res = await axios.get('http://localhost:5000/ticket',body, config)

//         // dispatch({
//         //     type: POST_TICKET,
//         //     payload: res.data.data
//         // })

//     } catch(err){
//         const errors = err.response.data.errors
//         if(errors){
//             console.log(errors)
//             // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//     }
// }

// export const updateTickets = ({postData, ticketId}) => async (dispatch) => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
   
//     const body = JSON.stringify({...postData})

//     try{
//         const res = await axios.get(`http://localhost:5000/ticket/${ticketId}`,body, config)

//         dispatch({
//             type: POST_TICKET,
//             payload: res.data.data
//         })

//     } catch(err){
//         const errors = err.response.data.errors
//         if(errors){
//             console.log(errors)
//             // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//     }
// }
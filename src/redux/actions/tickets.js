import axios from 'axios'
import { URL } from '../../components/url'
import { setAlert } from './alert'
import { GET_TICKET, POST_TICKET, GET_TICKET_BY_NUMBER, GET_TICKET_BY_ID, FILTER_TICKET } from './constants'

export const getAllTickets = () => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }
   

    try{
        const res = await axios.get(`${URL}/ticket`, config)
        // const res = await axios.get('http://localhost:5000/ticket', config)

        dispatch({
            type: GET_TICKET,
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

export const getTicketByNumber = (mobileNo) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({mobileNo:mobileNo})

    try{
        // const res = await axios.post('http://localhost:5000/ticket/mobile',body, config)
        const res = await axios.post(`${URL}/ticket/mobile`,body, config)
        
        dispatch({
            type: GET_TICKET_BY_NUMBER,
            payload: res.data.data
        })

    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            console.log(errors)
            dispatch(setAlert(errors[0].msg, 'danger'))
            // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const getTicketId = (Id) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.get(`${URL}/ticket/${Id}`,config)
        // const res = await axios.get(`http://localhost:5000/ticket/${Id}`,config)
        
        dispatch({
            type: GET_TICKET_BY_ID,
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

export const postTickets = (postData) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }

    // console.log('postdata======',postData)

    const body = JSON.stringify(postData)

    try{
        // console.log('body======',body)
        // const res = await axios.post('http://localhost:5000/ticket',postData, config)
        const res = await axios.post(`${URL}/ticket`,body, config)

        dispatch({
            type: POST_TICKET,
            payload: res.data.data
        })

    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            console.log(errors)
            dispatch(setAlert(errors[0].msg, 'danger'))
            // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
    }
}

export const updateTickets = ({postData, ticketId}) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }
   
    const body = JSON.stringify({...postData})

    try{

        // console.log(body)
        const res = await axios.get(`${URL}/ticket/${ticketId}`,body, config)

        dispatch({
            type: POST_TICKET,
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

export const filterTickets = (postData) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }
   
    const body = JSON.stringify({...postData})

    try{

        // console.log(body)
        const res = await axios.post(`${URL}/ticket/filter`,body, config)

        dispatch({
            type: FILTER_TICKET,
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
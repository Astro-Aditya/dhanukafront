import axios from 'axios'
import { setAlert } from './alert'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './constants'
import setAuthToken from '../../utils/setAuthToken'
import { URL } from '../../components/url'

// Keep user loaded persistently
export const loadUser = () => async(dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }

    try{
        const res = await axios.get(`${URL}/auth`, config)
        // const res = await axios.get('http://localhost:5000/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
}


// Register user
export const register = ({ username, password}) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username, password})
    try{
        const res = await axios.post(`${URL}/user/register`, body, config)
        // const res = await axios.post('https://dhanuka-backend.herokuapp.com/user/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch(err){
        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}

//Login
export const login = ({ username, password}) => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }
   
    const body = JSON.stringify({username, password})

    try{
        // const res = await axios.post('http://localhost:5000/user/login', body, config)
        const res = await axios.post(`${URL}/user/login`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch(err){
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}

//Logout
export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}



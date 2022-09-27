import axios from 'axios'
import { URL } from '../../components/url'
import { setAlert } from './alert'
import { GET_PROD } from './constants'

//Get Products
export const getProduct = () => async (dispatch) => {
    const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
    }
   

    try{
        // const res = await axios.get('http://localhost:5000/product', config)
        const res = await axios.get(`${URL}/product`, config)

        dispatch({
            type: GET_PROD,
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
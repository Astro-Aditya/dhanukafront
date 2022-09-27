import React, {useState} from 'react'
import Card from '../components/Card'
// import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector} from 'react-redux'
import Form from 'react-bootstrap/Form';
import '../styles/Login.css'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import {login} from '../redux/actions/auth'
import Alerts from '../components/Alert';

import Spinner from 'react-bootstrap/Spinner';
import Loader from '../components/Loader';


function Login() {
  const authenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    username:'',
    password:'',
  })

const {username, password} = formData

  const signIn = () => {
    setIsLoading(true)
    dispatch(login({username, password}))
  }

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  if(authenticated){
    setIsLoading(false)
    navigate('/dashboard')
  }

  return (
    <div className='mainContainer'>
      {isLoading && <Loader />}
      <div className='cardContainer'>
        <div className='imageContainer'>
          <img src={require('../assets/dhanukaLogoHome.png')} />
        </div>
        <Card>
          <div className='insideCardContainer'>
            <div className='signIn'>
              <h1>Sign In</h1>
            </div>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Username" 
                    name="username"
                    onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    onChange={e => onChange(e)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <Button callFunction={signIn}>Sign In</Button>
              </Form>
            </div>
          </div>
        </Card>
        <Alerts />
      </div>
    </div>
  )
}

export default Login
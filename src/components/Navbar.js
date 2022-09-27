import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOn, faToggleOff, faCompress, faExpand, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/auth'
import { useNavigate } from 'react-router-dom'

import '../styles/Navbar.css'

function Navbar(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {sideBarOpen, setSideBarOpen, isMaximized, setIsMaximized} = props

    const toggleButton = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const logUserOut = () => {
        dispatch(logout())
        navigate("/")
    }

    const maximize = () => {
        setIsMaximized(!isMaximized)
    }
    return (
        <div className='navbarContainer'>
            <div>
                <img className='photo' src={require('../assets/dhanukaLogoHome.png')} />
            </div>
            {
                sideBarOpen ?
                ( 
                    <div onClick={toggleButton} className='toggle'>
                        <FontAwesomeIcon icon={faToggleOn} size="lg" />
                    </div>
                ):
                (
                    <div onClick={toggleButton} className='toggle'>
                        <FontAwesomeIcon icon={faToggleOff} size="lg" />
                    </div>
                )
            }

            {/* {
                isMaximized ?
                (
                    <div onClick={() => maximize()} className='maxmin'>
                        <FontAwesomeIcon icon={faCompress} size="lg"/>
                    </div>
                ):
                (
                    <div onClick={() => maximize()} className='maxmin'>
                        <FontAwesomeIcon icon={faExpand} size="lg"/>
                    </div>
                )
            } */}

            <div className='title'>
                DHANUKA INBOUND CRM
            </div>
        
            
            <div onClick={logUserOut} className='Logout'>
                <div>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg"/>
                </div>
                <div>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar
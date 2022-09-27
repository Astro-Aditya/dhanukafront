import React from 'react'
import '../styles/Button.css'

function Button(props) {
  return (
    <div onClick={props.callFunction} className='mainButton'>{props.children}</div>
  )
}

export default Button
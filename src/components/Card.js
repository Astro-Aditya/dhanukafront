import React from 'react'
import '../styles/Card.css'

function Card(props) {
  return (
    <div className='mainCard'>{props.children}</div>
  )
}

export default Card
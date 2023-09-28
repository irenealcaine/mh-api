import React from 'react'
import "./BackButton.css"
import { AiOutlineLeft } from 'react-icons/ai'

const BackButton = ({ to, value }) => {
  return (

    <a href={to} className='backButton'><span><AiOutlineLeft /></span>{" "}{value}</a>

  )
}

export default BackButton

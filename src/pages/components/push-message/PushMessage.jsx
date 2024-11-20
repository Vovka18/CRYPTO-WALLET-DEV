import React from 'react'
import './push-message.css'
import {ReactComponent as Arrow} from '../../../img/arrow-push-message.svg'
import {useNavigate} from "react-router";

const PushMessage = ({msg}) => {
    const navigate = useNavigate()
  return (
    <div className='push-message'>
        <Arrow onClick={() => navigate("/home")}/>
        <h2>{msg}</h2>
    </div>
  )
}

export default PushMessage
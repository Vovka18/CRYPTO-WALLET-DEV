import React from 'react'
import './logo.css'
import {ReactComponent as Logo} from '../../../img/Logo.svg'


const mainLogo = () => {
  return (
    <div className='mainLogo'>
        <Logo/>
        <h1>СRYPTO WALLET</h1>
    </div>
  )
}

export default mainLogo
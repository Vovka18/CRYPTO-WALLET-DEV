import React, { useEffect, useState } from 'react'
import PushMessage from '../components/push-message/PushMessage'
import ErrorMessage from '../components/error-message/ErrorMessage'
import Button from '../components/button/Button'
import AppNav from '../components/app-nav/AppNav'
import './Change-pin.css'
import { useTranslation } from 'react-i18next'

const ChangePin = () => {
    const { t } = useTranslation();
    const [errorMsg, setErrorMsg] = useState("")
    const [email, setEmail] = useState("")
  

    // useEffect(()=>{

    // },errorMsg)

    const sendMain = () => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(regexEmail.test(email) === false){
            setErrorMsg(t("change-pin.error-msg"))
        }
    }

    return (
    <div className='change-pin'>
        <PushMessage msg={t("change-pin.push-msg")}/>
        <ErrorMessage textError={errorMsg}/>
        <div className="change-pin-data">
            <input type="email" placeholder={t("change-pin.placeholder")} onChange={(e)=>setEmail(e.target.value)}/>
            <Button text={t("change-pin.btn")} onClick={()=>sendMain()}/>
        </div>
        <AppNav block={"setting"}/>
    </div>
  )
}

export default ChangePin
import React, { useEffect, useState } from 'react'
import PushMessage from '../components/push-message/PushMessage'
import ErrorMessage from '../components/error-message/ErrorMessage'
import Button from '../components/button/Button'
import AppNav from '../components/app-nav/AppNav'
import './Change-pin2.css'
import { useTranslation } from 'react-i18next'

const ChangePin = () => {
    const { t } = useTranslation();
    const [errorMsg, setErrorMsg] = useState("")

    const [pinData, setPinData] = useState({code: "", newPin: "", pinRepeat: ""})
    
    const sendMain = () => {
        console.log(pinData.newPin === pinData.pinRepeat && Number(pinData.newPin) != isNaN);
        
        if(pinData.newPin === pinData.pinRepeat && pinData.newPin.length === 4 && Number(pinData.newPin) !== isNaN){    //ok

        }else{
            setErrorMsg(t("change-pin2.error-msg"))
        }
    }

    return (
    <div className='change-pin2'>
        <PushMessage msg={t("change-pin.push-msg")}/>
        <ErrorMessage textError={errorMsg}/>
        <div className="change-pin-data">
            <div className="inputs">
                <input type="text" placeholder={t("change-pin2.placeholder-code")} onChange={(e)=>setPinData({...pinData, code: e.target.value})}/>
                <input type="password" maxLength={4} placeholder={t("change-pin2.placeholder-pin")} onChange={(e)=>setPinData({...pinData, newPin: e.target.value})}/>
                <input type="password" maxLength={4} placeholder={t("change-pin2.placeholder-pin-repeat")} onChange={(e)=>setPinData({...pinData, pinRepeat: e.target.value})}/>
            </div>
            <Button text={t("change-pin.btn")} onClick={()=>sendMain()}/>
        </div>
        <AppNav block={"setting"}/>
    </div>
  )
}

export default ChangePin
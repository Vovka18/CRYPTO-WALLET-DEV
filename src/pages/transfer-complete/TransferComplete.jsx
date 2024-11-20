import React from 'react'
import { useTranslation } from 'react-i18next'
import {ReactComponent as AcceptIco} from '../../img/accept-ico.svg'
import PushMessage from '../components/push-message/PushMessage'
import Button from '../components/button/Button'
import AppNav from '../components/app-nav/AppNav'
import './transfer-complete.css'
import {useNavigate} from "react-router";


const TransferComplete = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const url = new URL(document.location.href);
    let dep = (url.searchParams.get('s'));
    let cur = (url.searchParams.get('c'));
    let tUID = (url.searchParams.get('u'));

  return (
    <div className='transferComplete'>
        <PushMessage msg={t("transfer-complete.push-msg")}/>
        <div className="completed">
            <AcceptIco/>
            <div className="text-complete">
                <h4>{`${dep} ${cur} ${t("transfer-complete.text")} #${tUID}`}</h4>
                <Button onClick={() => navigate("/home")} text={t("transfer-complete.btn")}/>
            </div>
        </div>
        <AppNav block={"setting"}/>
    </div>
  )
}

export default TransferComplete
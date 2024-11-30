import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import ToggleButtons from "../components/toggle-button/ButtonToggle"
import Button from "../components/button/Button"
import PushMessage from "../components/push-message/PushMessage"
import './Payment.css'
import axios from "axios";
import {useNavigate} from "react-router";


const Payment = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [sumPayment, setSumPayment] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(0) // 0 - apple, 1 - google
    const currencyCode = localStorage.getItem("currencyCode") ? localStorage.getItem("currencyCode") : "UAH";

    const deposithandle = () => {
        axios.post("https://api.walletuah.com/api/balance/deposit", {
            "amount": Number(sumPayment),
            "currency_code": currencyCode,
            "user_id": Number(localStorage.getItem("userid"))
        })
            .then(() => {
                navigate(`/payment-complete?s=${sumPayment}&c=${currencyCode}`);
            })
            .catch((err)=>{
                alert(JSON.stringify(err))
            })
    }

  return (
    <div className='payment'>
        <PushMessage msg={t("payment.push-message")}/>
        <div className="method-data">
            <div className="method-payment">
                <h4>{t("payment.method-payment")}</h4>
                <ToggleButtons btn1={"Apple Pay"} btn2={"Google Pay"} setParametr={setPaymentMethod}/>
            </div>
            <div className="input-data">
              <input type="number" placeholder={t("payment.input-placeholder")} onChange={(e)=>setSumPayment(e.target.value)} />
              <Button onClick={deposithandle} text={t("payment.btn")}/>
            </div>
        </div>

    </div>
  )
}

export default Payment
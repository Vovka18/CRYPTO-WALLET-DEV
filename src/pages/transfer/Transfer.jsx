import React, {useState } from 'react'
import PushMessage from '../components/push-message/PushMessage'
import ErrorMessage from '../components/error-message/ErrorMessage'
import Button from '../components/button/Button'
import AppNav from '../components/app-nav/AppNav'
import './Transfer.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from "notistack";


const Transfer = () => {
    const { t } = useTranslation();
    // const [errorMsg, setErrorMsg] = useState("")
    const [transferData, setTransferData] = useState({id: "", sum: ""})
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar();


    const sendMain = () => {
        axios.post("https://api.walletuah.com/transaction/create", {
            "amount": Number(transferData.sum),
            "currency_code": localStorage.getItem("currencyCode"),
            "receiver_id": Number(transferData.id),
            "sender_id": Number(localStorage.getItem("userid"))
        })
            .then((response) => {
                console.log(response);
                enqueueSnackbar("ok", {
                    variant: "success",
                });
                navigate(`/transfer-complete?s=${transferData.sum}&c=${localStorage.getItem("currencyCode")}&u=${transferData.id}`);
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error, {
                    variant: "error",
                });
            });
    }

    return (
        <div className='transfer'>
            <PushMessage msg={t("transfer.push-message")}/>
            {/* <ErrorMessage textError={errorMsg}/> */}
            <div className="transfer-data">
                <div className="inputs">
                    <input type="text" placeholder={t("transfer.inputId-placeholder")} onChange={(e)=>setTransferData({...transferData, id: e.target.value})}/>
                    <input type="text" placeholder={t("transfer.inputMoney-placeholder")} onChange={(e)=>setTransferData({...transferData, sum: e.target.value})}/>
                </div>
                <Button text={t("transfer.btn")} onClick={()=>sendMain()}/>
            </div>
            <AppNav block={"transfer"}/>
        </div>
    )
}

export default Transfer
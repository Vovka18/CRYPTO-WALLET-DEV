import React from 'react'
import usdt from "../../img/usdt.svg";
import uah from "../../img/uah.svg";
import {useTranslation} from "react-i18next";

const Transactions = ({listTransfers}) => {
  const { t } = useTranslation();
  const UID = localStorage.getItem("userid")
  function formatDate(dateString) {
    const date = new Date(dateString); // Преобразуем строку в объект Date

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  console.log(listTransfers, 'trajksdf');
  

  return (
    // ~~~
    // transfer = {
    //   "sender_id": 9,
    //   "receiver_id": 9,
    //   "currency_code": "UAH",
    //   "amount": 1
    // }

    <ul>
      {listTransfers === null ? 
      (
          <h3 className="empty">{t("home.empty-transactions")}</h3>
      )
      :
      listTransfers.map((transfer)=><li>
            <div className="info-transfer">
                <img src={transfer.currency_code === "UAH" ? uah : usdt} alt="" />
                <div className="text-info">
                    <h2>{transfer.currency_code}</h2>
                    <p className={transfer.status == "approved" ? "plus" : transfer.status == "pending" ? "pending" : "minus"}>{transfer.status}</p>
                </div>
            </div>
            <div className="data">
                <p className={transfer.receiver_id === UID ? "count-money plus" : "count-money minus"}>{transfer.amount} USDT</p>
                <p className="time">{formatDate(transfer.date)}</p>
            </div>
        </li>)}

    </ul>
  )
}

export default Transactions



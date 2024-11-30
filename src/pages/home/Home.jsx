import React, {useEffect} from 'react'
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import Transactions from './Transactions'
import sort from "../../img/Sort.svg";
import AppNav from '../components/app-nav/AppNav'
import './Home.css'
import {useNavigate} from "react-router";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const currencyCode = localStorage.getItem('currencyCode');

    const [transactions, setTransactions] = useState([])
    const testListTransfers = [
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
        {currency: "usdt", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "-2,635.48", date: "01-11-24 18:24"},
        {currency: "usdt", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:37"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+45.1%", action: "-2,635.48", date: "01-11-24 18:24"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:10"},
        {currency: "usdt", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
        {currency: "usdt", exchangeRate: "$1.00", exchangeRate2: "+0.2%", action: "+2,635.48", date: "01-11-24 18:99"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "-2,635.48", date: "01-11-24 18:24"},
        {currency: "usdt", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "-2,635.48", date: "01-11-24 18:24"},
        {currency: "usdt", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
        {currency: "usdt", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "-2,635.48", date: "01-11-24 18:00"},
        {currency: "uah", exchangeRate: "$1.00", exchangeRate2: "+0.01%", action: "+2,635.48", date: "01-11-24 18:24"},
    ]


    const [counterMoney, setCounterMoney] = useState(0);
    const [countMoney, setCountMoney] = useState(0);


    const getBalanceHandle = () => {
        axios.get(`https://api.walletuah.com/api/balance/check?user_id=${localStorage.getItem("userid")}`)
            .then((response) => {
                // alert(JSON.stringify(response.data));
                setCountMoney(response.data == null ? 0 : response.data[0].amount)
            })
    }
    const getTransactionsHandle = () => {
        axios.get(`https://api.walletuah.com/api/transactions?user_id=${localStorage.getItem("userid")}`)
            .then((response) => {
                // alert(JSON.stringify(response.data));
                setTransactions(response.data)
            })
    }
    useEffect(() => {
        getTransactionsHandle();
        getBalanceHandle();
    }, [])

    useEffect(() => {
        const numberpPlus = Math.round(countMoney / 100 * 1);

        const animateCounter = async () => {
            while (counterMoney < countMoney) {
                setCounterMoney(prev => {
                    const nextValue = prev + numberpPlus;
                    return nextValue >= countMoney ? countMoney : nextValue;
                });

                await new Promise(resolve => setTimeout(resolve, 10));
            }
        };

        animateCounter();

        return () => setCounterMoney(countMoney);
    }, [countMoney]);
  return (
    <div className="home">
    <AppNav block="home"/>
    <main>
        {/*  balance-block && transactions */}
        <div className="balance">
          <h2>{t("home.my-balance")}</h2>

          <div className="money">
            <p className="my-money">{currencyCode == "UAH" ? "₴" : "$"} {counterMoney}</p>
            {/*<p className="interest">+96.11%</p>*/}
          </div>

          <div className="control-balance">
            <button id="deposit" onClick={() => navigate("/payment")}>
                <svg  viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.44466 9C2.44466 5.46447 2.44466 3.6967 3.54301 2.59835C4.64136 1.5 6.40912 1.5 9.94466 1.5C13.4802 1.5 15.248 1.5 16.3463 2.59835C17.4447 3.6967 17.4447 5.46447 17.4447 9C17.4447 12.5355 17.4447 14.3033 16.3463 15.4016C15.248 16.5 13.4802 16.5 9.94466 16.5C6.40912 16.5 4.64136 16.5 3.54301 15.4016C2.44466 14.3033 2.44466 12.5355 2.44466 9ZM9.94466 4.6875C10.2553 4.6875 10.5072 4.93934 10.5072 5.25V9.142L11.7969 7.85225C12.0166 7.63258 12.3727 7.63258 12.5924 7.85225C12.8121 8.07192 12.8121 8.42808 12.5924 8.64775L10.3424 10.8977C10.2369 11.0032 10.0938 11.0625 9.94466 11.0625C9.79547 11.0625 9.6524 11.0032 9.54691 10.8977L7.29691 8.64775C7.07724 8.42808 7.07724 8.07192 7.29691 7.85225C7.51658 7.63258 7.87273 7.63258 8.0924 7.85225L9.38216 9.142V5.25C9.38216 4.93934 9.63399 4.6875 9.94466 4.6875ZM6.94466 12.1875C6.634 12.1875 6.38216 12.4393 6.38216 12.75C6.38216 13.0607 6.634 13.3125 6.94466 13.3125H12.9447C13.2553 13.3125 13.5072 13.0607 13.5072 12.75C13.5072 12.4393 13.2553 12.1875 12.9447 12.1875H6.94466Z" fill="#E6E0E9"/>
                </svg>
              <p>{t("home.btn-deposit")}</p>
            </button>
            <button id="send-money" onClick={() => navigate("/transfer")}>
                <svg  viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.55731 9C1.55731 5.46447 1.55731 3.6967 2.65566 2.59835C3.75401 1.5 5.52178 1.5 9.05731 1.5C12.5928 1.5 14.3606 1.5 15.459 2.59835C16.5573 3.6967 16.5573 5.46447 16.5573 9C16.5573 12.5355 16.5573 14.3033 15.459 15.4017C14.3606 16.5 12.5928 16.5 9.05731 16.5C5.52178 16.5 3.75401 16.5 2.65566 15.4017C1.55731 14.3033 1.55731 12.5355 1.55731 9ZM9.05731 13.3125C9.36797 13.3125 9.61981 13.0607 9.61981 12.75V8.858L10.9096 10.1477C11.1292 10.3674 11.4854 10.3674 11.7051 10.1477C11.9247 9.92808 11.9247 9.57192 11.7051 9.35225L9.45506 7.10225C9.34957 6.99676 9.2065 6.9375 9.05731 6.9375C8.90813 6.9375 8.76505 6.99676 8.65956 7.10225L6.40956 9.35225C6.18989 9.57192 6.18989 9.92808 6.40956 10.1477C6.62923 10.3674 6.98539 10.3674 7.20506 10.1477L8.49481 8.858V12.75C8.49481 13.0607 8.74665 13.3125 9.05731 13.3125ZM6.05731 5.8125C5.74665 5.8125 5.49481 5.56066 5.49481 5.25C5.49481 4.93934 5.74665 4.6875 6.05731 4.6875H12.0573C12.368 4.6875 12.6198 4.93934 12.6198 5.25C12.6198 5.56066 12.368 5.8125 12.0573 5.8125H6.05731Z" fill="#E6E0E9"/>
                </svg>
              <p>{t("home.btn-send")}</p>
            </button>
            <button id="transactions" onClick={() => navigate("/home")}>
                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.59835 2.59835C1.5 3.6967 1.5 5.46447 1.5 9C1.5 12.5355 1.5 14.3033 2.59835 15.4017C3.6967 16.5 5.46447 16.5 9 16.5C12.5355 16.5 14.3033 16.5 15.4017 15.4017C16.5 14.3033 16.5 12.5355 16.5 9C16.5 5.46447 16.5 3.6967 15.4017 2.59835C14.3033 1.5 12.5355 1.5 9 1.5C5.46447 1.5 3.6967 1.5 2.59835 2.59835ZM8.19799 5.6738C8.43205 5.46953 8.4562 5.1142 8.25193 4.88014C8.04766 4.64608 7.69232 4.62193 7.45826 4.8262L4.88014 7.0762C4.70348 7.23037 4.64099 7.47796 4.72332 7.69751C4.80564 7.91705 5.01552 8.0625 5.25 8.0625L12.75 8.0625C13.0607 8.0625 13.3125 7.81066 13.3125 7.5C13.3125 7.18934 13.0607 6.9375 12.75 6.9375L6.75 6.9375L8.19799 5.6738ZM13.2767 10.3025C13.1944 10.0829 12.9845 9.9375 12.75 9.9375L5.25 9.9375C4.93934 9.9375 4.6875 10.1893 4.6875 10.5C4.6875 10.8107 4.93934 11.0625 5.25 11.0625L11.25 11.0625L9.80201 12.3262C9.56795 12.5305 9.5438 12.8858 9.74807 13.1199C9.95234 13.3539 10.3077 13.3781 10.5417 13.1738L13.1199 10.9238C13.2965 10.7696 13.359 10.522 13.2767 10.3025Z" fill="#E6E0E9"/>
                </svg>
                <p>{t("home.btn-transfer")}</p>
            </button>
          </div>
        </div>

        <div className="transactions">
          <div className="info">
            <p className="last-transactions">{t("home.last-transfer")}</p>
            <div className="sort">
              <p>{t("home.sorted")}</p>
              <img src={sort} alt="" />
            </div>
          </div>

            <Transactions listTransfers={testListTransfers}/>

        </div>
        {transactions && (
            <div className="filler"></div>
        )}
      </main>
    </div>
  );
};

export default Home;
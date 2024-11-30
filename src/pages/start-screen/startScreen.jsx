import React, { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next';
import MainLogo from "../components/logo/mainLogo"
import ToggleButtons from "../components/toggle-button/ButtonToggle"
import Button from '../components/button/Button'
import './StartScreen.css'
import {useNavigate} from "react-router";
import axios from 'axios';

const StartScreen = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") == "ua" ? 0 : 1;
  const [language, setLanguage] = useState(0) // 0 - ua, 1 - ru
  useEffect(()=>{
    i18n.changeLanguage(language === 0 ? "ua" : "ru")
  },[language])

  useEffect(()=>{
    const userId = localStorage.getItem("userid")

    const isLoggedIn = localStorage.getItem("isLoggedIn")
      // console.log(userId);
      // isLoggedIn == "true" && userId !== null
      if (true) {
        axios.get(`https://api.walletuah.com/api/user?user_id=${userId}`)
        .then((response)=>{
          navigate("/enter-pin")
        }).catch((err)=>{
          console.log(err.response?.data?.error);
        })
    }
  }, [])

  


  return (
    <div className='StartScreen'>
        <MainLogo/>
        <h4>
        {t('start-screen.welcome1')}
        <br />
        {t('start-screen.welcome2')}
        </h4>
        <ToggleButtons btn1={t('start-screen.btn-ua')} defaultActive={currentLanguage} btn2={t('start-screen.btn-ru')} setParametr={setLanguage}/>
        <Button onClick={() => navigate("/sign-up")} text={t('start-screen.btn')}/>
    </div>
  )
}

export default StartScreen
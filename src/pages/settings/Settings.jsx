import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PushMessage from "../components/push-message/PushMessage";
import ToggleButton from "../components/toggle-button/ButtonToggle";
import AppNav from "../components/app-nav/AppNav";
import "./Settings.css";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = localStorage.getItem("i18nextLng") == "ua" ? 0 : 1;
  const currentCurrency = localStorage.getItem("currencyCode") == "UAH" ? 0 : 1;
  const [language, setLanguage] = useState(currentLanguage) // 0 - ua, 1 - ru
  const [currency, setCurrency] = useState(currentCurrency) // 0 - uah, 1 - usdt


  useEffect(()=>{
    i18n.changeLanguage(language === 0 ? "ua" : "ru")
  },[language])
  useEffect(()=>{
      localStorage.setItem("currencyCode", currency == 0 ? "UAH" : "USD");
  },[currency])

  return (
    <div className="settings">
      <AppNav block="setting" />
      <PushMessage msg={t("settings.push-msg")} />
      <div className="setting">
        <div className="language">
          <h4>{t("settings.language-app")}</h4>
          <ToggleButton btn1={t("settings.ukr")} btn2={t("settings.ru")} defaultActive={currentLanguage} setParametr={setLanguage} />
        </div>
        <div className="currency">
          <h4>{t("settings.current-balance")}</h4>
          <ToggleButton btn1={t("settings.uah")} btn2={t("settings.usd")} defaultActive={currentCurrency} setParametr={setCurrency} />
        </div>
      </div>
      <div className="text-setting">
        <h4>{t("settings.change-pin")}</h4>
        <h4>{t("settings.support-service")}</h4>
      </div>
    </div>
  );
};

export default Settings;

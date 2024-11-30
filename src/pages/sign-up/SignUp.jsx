import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/button/Button";
import ErrorMessage from "../components/error-message/ErrorMessage";

import "./SignUp.css";
import axios from "axios";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router";

const SignUp = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

    const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({
    name: "",
    date: "",
    email: "",
    phone: "",
    pin: "",
    pinRepeat: "",
  });
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    console.log(userData);
  }, [messageError]);

  const chekEnter = async () => {
    const validMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^(\+?\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    const validDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    alert(JSON.stringify({
      "birth_date": String(userData.date),
      "email": String(userData.email),
      "full_name": String(userData.name),
      "phone": String(userData.phone),
      "pin": String(userData.pin),
      "telegramid": window.Telegram.WebApp.initDataUnsafe?.user?.id
      // "telegramid": "45364561231"
    }))

    if (userData.name.length < 5 || userData.name.length > 40) {
        setMessageError("Incorrect name");
    }else if(validDate.test(userData.date) === false){
        setMessageError("Incorrect date");
    }else if (!validMail.test(userData.email)) {
        setMessageError("Incorrect email");
    }else if(!phoneRegex.test(userData.phone)){
        setMessageError("Incorrect phone");
    }else if(userData.pin.length !== 4 || Number(userData.pin) === isNaN){
        setMessageError("Incorrect pin");
    }else if(userData.pin !== userData.pinRepeat){
        setMessageError("Incorrect repeat pin");
    }else{
      axios.post("https://api.walletuah.com/api/register", {
        "birth_date": String(userData.date),
        "email": String(userData.email),
        "full_name": String(userData.name),
        "phone": String(userData.phone),
        "pin": String(userData.pin),
        "telegramid": String(window.Telegram.WebApp.initDataUnsafe?.user?.id)
        // "telegramid": "45364561231"
      })
      .then(response => {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("telegramid", response.data.user.telegramid);
        localStorage.setItem("userid", response.data.user.id);
        navigate("/home")
      })
      .catch(error => {
          alert(JSON.stringify(error.response.data));
          console.log(error.response.data.error);
          console.log(error.response);
          enqueueSnackbar(error.response.data.error, {
              variant: "error"
          })

      });
    }

  };

  const changeInputDate = (e) => {
    setUserData({...userData, date: e.target.value})
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
      // e.preventDefault(); // Останавливаем стандартное поведение
    }
  });

  return (
    <div className="SignUp">
      <ErrorMessage textError={messageError}/>
      <main>
        <h4>{t("sign-up.reg-new-user")}</h4>

        <div className="inputs">
            <input id="text" type="text" name="name" placeholder={t("sign-up.input-name")} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}/>
            {/* <input id="date" type="date" name="date" placeholder={t("sign-up.input-date")} min="1900-01-01" max="2010-01-01"onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}/> */}
            
            <div className="input-date">
              <input id="date-text" type="text" placeholder={t("sign-up.input-date")} onChange={changeInputDate} value={userData.date}/>
              <input type="date" onChange={changeInputDate}  />
            </div>
            
            <input id="email" type="email" name="email" placeholder={t("sign-up.input-mail")} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}/>
            <input id="tel" type="tel" name="phone" placeholder={t("sign-up.input-phone")} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })} />
            <input id="password" type="password" name="pin" maxLength="4" placeholder={t("sign-up.input-pin")} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}/>
            <input id="password-repeat" type="password" name="pinRepeat" maxLength="4" placeholder={t("sign-up.input-pin-repeat")} onChange={(e) => setUserData({ ...userData, [e.target.name]: e.target.value })}/>
        </div>
        <Button onClick={()=> chekEnter()} text={t("sign-up.reg-button")} />
      </main>
    </div>
  );
};

export default SignUp;

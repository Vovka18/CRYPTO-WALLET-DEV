import React, { useEffect, useState } from "react";
import { ReactComponent as Backspace } from "../../img/backspace.svg";
import { useTranslation } from "react-i18next";
import Button from "../components/button/Button";
import MainLogo from "../components/logo/mainLogo";
import "./enter-pin.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Navigate, useNavigate } from "react-router-dom";

const EnterPin = () => {
    const Navigate = useNavigate();
    const { t } = useTranslation();
    const [pin, setPin] = useState("");
    const [apiResult, setApiResult] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    const name = window.Telegram.WebApp.initDataUnsafe?.user?.first_name;
    const id = window.Telegram.WebApp.initDataUnsafe?.user?.id;

    const enterPin = async () => {
        if (true) {
            if (pin.length == 4) {
                axios
                    .post("https://api.testwallet.space/user/pin", {
                        pin: "8642",
                        telegramid: 9334296590,

                        // pin: pin,
                        // telegramid: window.Telegram.WebApp.initDataUnsafe?.user?.id
                        //     ? window.Telegram.WebApp.initDataUnsafe?.user?.id
                        //     : "1234567890",
                    })
                    .then((response) => {
                        console.log(response);
                        enqueueSnackbar("ok", {
                            variant: "success",
                        });
                        localStorage.setItem("hashed_pin", response.data.hashed_pin);
                        Navigate("/home");
                    })
                    .catch((error) => {
                        console.log(error.response);
                        enqueueSnackbar(error, {
                            variant: "error",
                        });
                    });
            }else {
                enqueueSnackbar("Введите пароль", {
                    variant: "error",
                });
            }
        } else {
            enqueueSnackbar("Login via Telegram app", {
                variant: "error",
            });
        }
    };

    const addNum = (num) => {
        setPin(pin + num);
    };
    const minusNum = () => {
        setPin(pin.slice(0, -1));
    };

    return (
        <div className="EnterPin">
            <div className="wrapper">
                <div className="text">
                    <MainLogo />
                    <h4>
                        {t("pin.welcome1")} {name}!<br />
                        {t("pin.welcome2")}
                    </h4>
                </div>
                <div className="pinCode">
                    <div className="dots">
                        <div className={pin?.length >= 1 ? "dot dot-activ" : "dot"}></div>
                        <div className={pin?.length >= 2 ? "dot dot-activ" : "dot"}></div>
                        <div className={pin?.length >= 3 ? "dot dot-activ" : "dot"}></div>
                        <div className={pin?.length >= 4 ? "dot dot-activ" : "dot"}></div>
                    </div>
                    <div className="keyboard">
                        <div className="num" onClick={() => addNum(1)}>
                            1
                        </div>
                        <div className="num" onClick={() => addNum(2)}>
                            2
                        </div>
                        <div className="num" onClick={() => addNum(3)}>
                            3
                        </div>
                        <div className="num" onClick={() => addNum(4)}>
                            4
                        </div>
                        <div className="num" onClick={() => addNum(5)}>
                            5
                        </div>
                        <div className="num" onClick={() => addNum(6)}>
                            6
                        </div>
                        <div className="num" onClick={() => addNum(7)}>
                            7
                        </div>
                        <div className="num" onClick={() => addNum(8)}>
                            8
                        </div>
                        <div className="num" onClick={() => addNum(9)}>
                            9
                        </div>
                        <div className="num" onClick={() => addNum(0)}>
                            0
                        </div>
                        <div className="backspace" onClick={() => minusNum()}>
                            <Backspace />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <Button text={t("pin.btn")} onClick={() => enterPin()} />
                    <p>{t("pin.forgot-pin")}</p>
                </div>
            </div>
        </div>
    );
};

export default EnterPin;
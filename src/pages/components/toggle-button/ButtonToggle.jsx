import React, { useState } from 'react'
import "./toggle-buttons.css"

const ToggleButton = ({btn1, btn2, setParametr, defaultActive}) => {
  const [choise, setChoise] = useState(defaultActive); //0 - ua, 1 - ru
  const changeValue = (value) => {
    setChoise(value)
    setParametr(value)
  }
  return (
    <div className="toggle-buttons">
        <button className={choise === 0 ? "btn-active" : ""} onClick={() => changeValue(0)}>{btn1}</button>
        <button className={choise === 1 ? "btn-active" : ""} onClick={() => changeValue(1)}>{btn2}</button>
    </div>
  )
}

export default ToggleButton
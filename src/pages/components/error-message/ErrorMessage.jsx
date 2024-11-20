import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = ({textError}) => {
    
  return (
    <div className={textError.length != 0 ? "msg-error msg-error-activ" : "msg-error"}>
        {textError}
      </div>
  )
}

export default ErrorMessage
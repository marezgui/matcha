import React from 'react'
import './PasswordState.css'

const passwordState= (props) => {

    let pwdWeak = false
    let pwdMedium = false
    let pwdStrong = false

    if (0) {
        pwdWeak = true
    } else if (props.value > 8) {
        pwdWeak = true
        pwdMedium = true
    } else if (props.value > 12) {
        pwdWeak = true
        pwdMedium = true
        pwdStrong = true
    }
        
    return (
        <div className="password-state" >
            <div className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}></div>
            <div className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}></div>
            <div className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}></div>
        </div>
    )
}

export default passwordState
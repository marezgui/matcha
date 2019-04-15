import React from 'react'
import './Input.scss'
import PasswordState from './PasswordState/PasswordState'

const input = (props) => {
    let inputElement = null
    let error = null

    switch ( props.inputtype ) {
        case ('input'):
            inputElement = <input className="InputElement" {...props}/>
            break
        case ('textarea'):
            inputElement = <textarea className="InputElement" {...props}/>
            break
        default:
            inputElement = <input className="InputElement" {...props}/>
    }
    
    if (props.error) {
        error = <small className="danger-error"> {props.error} </small>
    }

    return (
        <div className="Input">
            <label className="Label"> {props.label} </label>
            {inputElement}
            {error}
            {(props.inputtype === "password" && !error) ? <PasswordState /> : null}
        </div>
    )
}

export default input
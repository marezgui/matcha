import React, {Component}from 'react'
import './Input.scss'
import PasswordState from './PasswordState/PasswordState'

class Input extends Component {
    render() {
        let inputElement = null
        let error = null
    
        switch ( this.props.inputtype ) {
            case ('input'):
                inputElement = <input className="InputElement" {...this.props}/>
                break
            case ('textarea'):
                inputElement = <textarea className="InputElement" {...this.props}/>
                break
            default:
                inputElement = <input className="InputElement" {...this.props}/>
        }
        
        if (this.props.error) {
            error = <small className="danger-error"> {this.props.error} </small>
        }

        return (
            <div className="Input" >
                <label className="Label"> {this.props.label} </label>
                {inputElement}
                {error}
                {(this.props.inputtype === "password" && !error) ? <PasswordState /> : null}
            </div>
        )
    }
}

export default Input
import React, { Component } from 'react';
import { TextArea } from 'semantic-ui-react';
import './Input.scss';

class Input extends Component {
  state = {
  }

  render() {
    const { inputtype, error, label } = this.props;
    let inputElement = null;
    let errorMessage = null;

    switch (inputtype) {
      case 'input':
        inputElement = <input className="InputElement" {...this.props} />;
        break;
      case 'textarea':
        inputElement = <TextArea className="TextAreaElement" {...this.props} />;
        break;
      default:
        inputElement = <input className="InputElement" {...this.props} />;
    }

    if (error) {
      errorMessage = <small className="danger-error">{error}</small>;
    }

    return (
      <div className="Input">
        <label className="Label">
          {label}
        </label>
        {inputElement}
        {errorMessage}
      </div>
    );
  }
}

export default Input;

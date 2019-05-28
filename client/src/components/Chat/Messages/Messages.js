import React, { Component } from 'react';

class Messages extends Component {
    state = {

    }

    render() {
      const { back } = this.props;

      return (
        <div>
          <div>
            <p onClick={back} className="Pointer"> Back </p>
          </div>
          <br />
          <br />
          <br />
          <div>
            <p> Messages .... </p>
          </div>
        </div>
      );
    }
}

export default Messages;

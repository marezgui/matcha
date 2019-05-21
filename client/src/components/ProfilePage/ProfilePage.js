import React, { Component } from 'react';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import Modal from 'components/UI/Modal/Modal';

import './ProfilePage.css';

class ProfilePage extends Component {
  state = {
    showBackdrop: true,
  }

  onClickHandler = () => {
    const { handleProfilePage } = this.props;

    this.setState({ showBackdrop: false });
    handleProfilePage();
  }

  render() {
    const { showBackdrop } = this.state;

    return (
      <>
        <Backdrop show={showBackdrop} clicked={this.onClickHandler} />
        <Modal clicked={this.onClickHandler}>
          hi
        </Modal>
      </>
    );
  }
}

export default ProfilePage;

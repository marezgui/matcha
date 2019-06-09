import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Spinner/Spinner';
import UserCard from '../../components/UserCard/UserCard';
import Filter from './Filter/Filter';
import './People.css';

class People extends Component {
  state = {
    users: [],
    count: 26,
    start: 0,
    hasMore: true,
    filter: {},
    filterOpen: false,
  };

  componentDidMount = async () => {
    console.log('start', this.state.start);
    this._isMounted = true;
    const { user: { userIsComplete } } = this.props;
    const { filter } = this.state;
    if (!userIsComplete) {
      return;
    }
    const { count, start } = this.state;
    const { token } = this.props;

    axios
      .post(`http://localhost:8080/api/social/getusersforme/${count}/${start}`, filter, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (this._isMounted) {
          this.setState({ users: res.data.resultData.users });
        }
        if (!res.data.resultData.users.length) {
          if (this._isMounted) { this.setState({ hasMore: false }); }
        }
        // console.log(res.data.resultData.newStart);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  applyFilter = (filter) => {
    this.setState({ filterOpen: false });
    this.setState({ filter }, () => {
      this.componentDidMount();
    });
  }

  fetchImages = () => {
    const { users, count, start, filter } = this.state;
    const { token } = this.props;

    this.setState({ start: start + count }, () => {
      const { count, start } = this.state; // TRFAS !
      // console.log('fetch', count, start);
      axios
        .post(`http://localhost:8080/api/social/getusersforme/${count}/${start}`, filter, { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          console.log(res);
          if (this._isMounted) {
            this.setState({ users: users.concat(res.data.resultData.users) });
          }
          // console.log(res.data.resultData.newStart);
          if (!res.data.resultData.users.length) {
            if (this._isMounted) { this.setState({ hasMore: false }); }
          }
        });
    });
  };

  render() {
    const { user: { userIsComplete } } = this.props;
    const { users, hasMore, filterOpen } = this.state;
    const redirect = <Redirect to="/profile" />;

    let filterComponent = (
      <aside className="FilterHandler">
        <div className="Pointer OpenFilter" onClick={() => this.setState({ filterOpen: true })} role="presentation"> Filter / Sort </div>
      </aside>
    );

    if (filterOpen) {
      filterComponent = (
        <aside className="FilterComponent">
          <Filter submitted={filter => this.applyFilter(filter)} />
        </aside>
      );
    }

    return (
      <section className="People">
        {!userIsComplete && redirect}
        {filterComponent}
        <InfiniteScroll
          dataLength={users.length}
          next={this.fetchImages}
          hasMore={hasMore}
          loader={<div className="LoaderContainer"><Spinner /></div>}
          endMessage={(
            <div style={{ width: '100%' }}>
              <p style={{ textAlign: 'center', padding: '10px' }}> Yay! You have seen it all </p>
            </div>
          )}
        >
          {users.map(user => (
            <UserCard
              key={user.idUser + Math.random()}
              data={user}
              refresh
            />
          ))}
        </InfiniteScroll>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(People);

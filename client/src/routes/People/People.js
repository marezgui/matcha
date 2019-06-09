import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../components/UI/Spinner/Spinner';
import UserCard from '../../components/UserCard/UserCard';
import Filter from '../../components/Filter/Filter';
import './People.css';

class People extends Component {
  state = {
    users: [],
    count: 20,
    start: 0,
    hasMore: true,
  };

  componentDidMount = async () => {
    this._isMounted = true;
    const { user: { userIsComplete } } = this.props;

    if (!userIsComplete) {
      return;
    }
    const { count, start } = this.state;
    const { token } = this.props;

    axios
      .post(`http://localhost:8080/api/social/getusersforme/${count}/${start}`, { scoreMin: 0, scoreMax: 1000 }, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        if (this._isMounted) {
          this.setState({ users: res.data.resultData.users });
        }
        // console.log(res.data.resultData.newStart);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchImages = () => {
    const { users, count, start } = this.state;
    const { token } = this.props;

    this.setState({ start: start + count }, () => {
      const { count, start } = this.state; // TRFAS !
      // console.log('fetch', count, start);
      axios
        .post(`http://localhost:8080/api/social/getusersforme/${count}/${start}`, { scoreMin: 0, scoreMax: 1000 }, { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
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
    const { users, hasMore } = this.state;
    const redirect = <Redirect to="/profile" />;
    return (
      <section className="People">
        {!userIsComplete && redirect}
        <aside className="PeopleFilterBox">
          <Filter />
        </aside>
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
              key={user.idUser}
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

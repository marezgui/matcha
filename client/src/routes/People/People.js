import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from 'components/UserCard/UserCard';
import Spinner from 'components/UI/Spinner/Spinner';
import Chat from 'components/Chat/Chat';
import './People.css';

class People extends Component {
  state = {
    users: [],
    count: 10,
    start: 0,
    hasMore: true,
  };

  componentDidMount() {
    const { count, start } = this.state;
    const { token } = this.props;

    axios
      .post(`social/getusersforme/${count}/${start}`, { scoreMin: 0, scoreMax: 1000 }, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        this.setState({ users: res.data.resultData.users });
        // console.log(res.data.resultData.newStart);
      });
  }

  fetchImages = () => {
    const { users, count, start } = this.state;
    const { token } = this.props;

    this.setState({ start: start + count }, () => {
      const { count, start } = this.state; // To REMOVE find a solution!
      // console.log('fetch', count, start);
      axios
        .post(`social/getusersforme/${count}/${start}`, { scoreMin: 0, scoreMax: 1000 }, { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          this.setState({ users: users.concat(res.data.resultData.users) });
          // console.log(res.data.resultData.newStart);
          if (!res.data.resultData.users.length) this.setState({ hasMore: false });
        });
    });
  };

  render() {
    const { users, hasMore } = this.state;

    return (
      <section className="People">
        <aside className="PeopleFilterBox">
          <section className="PeopleFilterBoxContent">
            Filter / Sort
          </section>
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
        <Chat />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(People);

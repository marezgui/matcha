import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from 'components/UserCard/UserCard';
import Spinner from 'components/UI/Spinner/Spinner';
import './People.css';

class People extends Component {
  state = {
    users: [],
    count: 10,
    start: 0,
  };

  componentDidMount() {
    const { count, start } = this.state;
    const { token } = this.props;

    axios
      .get(`social/getusersforme/${count}/${start}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        this.setState({ users: res.data.result });
      });
  }

  fetchImages = () => {
    const { users, count, start } = this.state;
    const { token } = this.props;

    this.setState({ start: start + count });
    axios
      .get(`social/getusersforme/${count}/${start}`, { headers: { Authorization: `bearer ${token}` } })
      .then((res) => {
        this.setState({ users: users.concat(res.data.result) });
      });
  };

  render() {
    const { users } = this.state;
    const { token } = this.props;

    return (
      <section className="People">
        <InfiniteScroll
          dataLength={users.length}
          next={this.fetchImages}
          hasMore
          loader={<div className="LoaderContainer"><Spinner /></div>}
        >
          {users.map(user => (
            <>
              <UserCard
                key={user.idUser}
                user={user}
                token={token}
                refresh // re-render child component hack
              />
            </>
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

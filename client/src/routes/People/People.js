import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserCard from 'components/UserCard/UserCard';
import './People.css';

class People extends Component {
  state = {
    users: [],
    count: 20,
    start: 1,
  };

  // componentDidMount() {
  //   axios
  //     .get('users/all')
  //     .then(res => this.setState({ users: res.data.success }));
  // }

  render() {
    const { user } = this.props;

    return (
      <section className="People">
        {/* <InfiniteScroll
          dataLength={users.length}
          next={this.fetchImages}
          hasMore
          loader={<h4>Loading...</h4>}
        >
          {console.log(users)}
          {users.map(user => (<UserCard user={user} />))}
        </InfiniteScroll> */}
        <UserCard user={user} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(People);

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

  componentDidMount = () => {
    this._isMounted = true;
    const { user: { userIsComplete } } = this.props;
    const { filter } = this.state;
    if (userIsComplete) {
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
        })
        .catch(() => {
          // console.log(err.response);
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  applyFilter = (filter) => {
    const { filter: { order, trie } } = this.state;
    const filterSort = { ...filter, order, trie };
    console.log(filterSort);
    this.setState({ filter: filterSort, start: 0, hasMore: true, filterOpen: false }, () => {
      console.log(this.state);
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
          // console.log(res);
          if (this._isMounted) {
            this.setState({ users: users.concat(res.data.resultData.users) });
          }
          // console.log(res.data.resultData.newStart);
          if (!res.data.resultData.users.length) {
            if (this._isMounted) { this.setState({ hasMore: false }); }
          }
        })
        .catch(() => {
          // console.log(err.response);
        });
    });
  };

  handleSelect = (e) => {
    const { filter } = this.state;
    const { value } = e.target;
    let order = 1;
    let trie = null;

    if (value === 'tag') {
      trie = value;
    } else {
      order = value[0];
      trie = value.substr(1);
    }
    this.setState({ filter: { ...filter, order, trie }, start: 0, hasMore: true }, () => {
      // console.log(this.state);
      this.componentDidMount();
    });
  }

  render() {
    const { user: { userIsComplete } } = this.props;
    const { users, hasMore, filterOpen } = this.state;
    const redirect = <Redirect to="/profile" />;
    let filterBoxClasses = ['filterBoxHide'];

    if (filterOpen) {
      filterBoxClasses = ['filterBoxDisplay'];
    }

    return (
      <section className="People">
        {!userIsComplete && redirect}
        <div>
          <aside className="FilterComponent">
            <div className="OpenFilter">
              <div className="Pointer OpenFilterFilter" onClick={() => this.setState({ filterOpen: !filterOpen })} role="presentation">
                <i className="fas fa-filter" />
                {' '}
              Filter
              </div>
              <div className="OpenFilterSort">

                {' '}

                <select className="Select" onChange={this.handleSelect} defaultValue="1score">
                  <option value="1age">Age: ASC </option>
                  <option value="0age">Age: DESC</option>
                  <option value="0distance">Distance: ASC</option>
                  <option value="1distance">Distance: DESC</option>
                  <option value="0score">Score: ASC</option>
                  <option value="1score">Score: DESC</option>
                  <option value="tag">Tags: by Order</option>
                </select>
              </div>
            </div>
            <div className={filterBoxClasses.join(' ')}>
              <Filter submitted={filter => this.applyFilter(filter)} />
            </div>
          </aside>
        </div>
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
              clicked={() => this.setState({ filterOpen: false })}
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

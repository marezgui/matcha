import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Tag } from 'antd';
import Slider from './Slider/Slider';
import Button from '../../../components/UI/Button/Button';
import './Filter.css';

class Filter extends Component {
    state = {
      distance: {
        min: 0,
        max: 1000,
      },
      age: {
        min: 0,
        max: 100,
      },
      score: {
        min: 0,
        max: 1000,
      },
      distanceMax: 1000,
      tags: [],
      tagSuggestion: [],
    }

    componentDidMount = () => {
      this._isMounted = true;
      const { token } = this.props;

      axios
        .get('http://localhost:8080/api/social/getusersvar/', { headers: { Authorization: `bearer ${token}` } })
        .then((res) => {
          // console.log(res.data.distanceMax);
          this.setState({ distance: { min: 0, max: Math.round(res.data.distanceMax + 0.5) },
            distanceMax: Math.round(res.data.distanceMax + 0.5) });
        });
      axios
        .get('http://localhost:8080/api/users/alltag')
        .then((res) => {
          if (this._isMounted) {
            this.setState({ tagSuggestion: res.data.alltag });
          }
        });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    sliderHandler = (value, name) => {
      const { distanceMax } = this.state;
      let [min, max] = value;

      if (name === 'score') {
        min *= 10;
        max *= 10;
        this.setState({ [name]: { min, max } });
      } else if (name === 'age') {
        this.setState({ [name]: { min, max } });
      } else {
        this.setState({ [name]: { min: Math.round(0.49 + (distanceMax * (min / 100))),
          max: Math.round(0.49 + (distanceMax * (max / 100))) } });
      }
    }

    submitFilter = (e) => {
      e.preventDefault();
      const { submitted } = this.props;
      const { distance, age, score, tags } = this.state;
      const filter = {
        ageMin: age.min,
        ageMax: age.max,
        distanceMin: distance.min,
        distanceMax: distance.max,
        scoreMin: score.min,
        scoreMax: score.max,
        tags,
      };
      submitted(filter);
    }

    handleSelectTag = (e) => {
      const { tags } = this.state;
      const { value } = e.target;

      if (value !== 'Suggestion' && !tags.includes(value)) {
        tags.push(value);
        this.setState({ tags });
      }
    }

    onRemoveTag = (e, tag) => {
      const { tags } = this.state;

      tags.forEach((tagState, id) => {
        if (tagState === tag) {
          tags.splice(id, 1);
        }
      });
      this.setState({ tags });
    }

    render() {
      const { distance, age, score, tags, tagSuggestion } = this.state;

      return (
        <form>
          <div className="Filter">
            <div className="FilterBox1">
              <div className="FilterAjust">
                <div> Distance </div>
                <Slider changed={newValue => this.sliderHandler(newValue, 'distance')} />
                <div className="SliderFooter">
                  <div>
                    {distance.min}
                  </div>
                  <div>
                    {distance.max}
                  </div>
                </div>
              </div>
              <div className="FilterAjust">
                <div> Age </div>
                <Slider changed={newValue => this.sliderHandler(newValue, 'age')} />
                <div className="SliderFooter">
                  <div>
                    {age.min}
                  </div>
                  <div>
                    {age.max}
                  </div>
                </div>
              </div>
              <div className="FilterAjust">
                <div> Score </div>
                <Slider changed={newValue => this.sliderHandler(newValue, 'score')} />
                <div className="SliderFooter">
                  <div>
                    {score.min}
                  </div>
                  <div>
                    {score.max}
                  </div>
                </div>
              </div>
            </div>
            <div className="FilterAjust">
              <div className="Suggestion">
                <div className="Select">
                  <select className="Select" onChange={this.handleSelectTag}>
                    <option value="Suggestion">
                      Suggestion
                    </option>
                    {tagSuggestion.map((tag, id) => (
                      <option key={id} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="YourTags">
                <p> Tags: </p>
                <div className="tags">
                  {tags.map((tag, id) => (
                    <Tag key={id} closable onClose={e => this.onRemoveTag(e, tag)}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button style={{ width: '70%' }} clicked={this.submitFilter}> Apply </Button>
              </div>
            </div>
          </div>
        </form>
      );
    }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Filter);

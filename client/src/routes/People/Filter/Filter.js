import React, { Component } from 'react';
import Slider from './Slider/Slider';
import Button from '../../../components/UI/Button/Button';
import './Filter.css';

class Filter extends Component {
    state = {
      distance: {
        min: 0,
        max: 100000,
      },
      age: {
        min: 0,
        max: 100,
      },
      score: {
        min: 0,
        max: 1000,
      },
    }

    sliderHandler = (value, name) => {
      let [min, max] = value;

      if (name !== 'age') {
        min *= 10;
        max *= 10;
        this.setState({ [name]: { min, max } });
      } else {
        this.setState({ [name]: { min, max } });
      }
    }

    submitFilter = (e) => {
      e.preventDefault();
      const { submitted } = this.props;
      const { distance, age, score } = this.state;
      const filter = {
        ageMin: age.min,
        ageMax: age.max,
        distanceMin: distance.min,
        distanceMax: distance.max,
        scoreMin: score.min,
        scoreMax: score.max,
      };
      submitted(filter);
    }

    render() {
      const { distance, age, score } = this.state;

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
              <Button clicked={this.submitFilter}> Apply </Button>
            </div>
            {/* <div className="FilterAjust">
            <div> Tags </div>
            <div>
              <p> Tags </p>
            </div>
          </div> */}
            <div className="FilterBox2">
              <p> . </p>
            </div>
          </div>
        </form>
      );
    }
}

export default Filter;

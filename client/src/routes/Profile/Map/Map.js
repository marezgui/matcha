import React, { Component } from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import axios from 'axios';
// import { getCity } from '../../../shared/utility';

export class MapContainer extends Component {
  state = {
    location: {},
    loading: true,
  };

  mapLocationPropsToState = () => {
    const { location } = this.props;
    if (location !== null) {
      const { location: { latitude, longitude } } = this.props;
      this.setState(
        { location: { lat: latitude, lng: longitude },
          loading: false }
      );
    }
  };

  navigatorGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      // Get position if he agreed
      const { latitude, longitude } = position.coords;
      await this.setState({
        location: {
          lat: latitude,
          lng: longitude,
        },
        loading: false,
      });
      this.changeUserLocation();
    });
  };

  ipLocation = () => {
    axios
      .get('https://ipapi.co/json/')
      .then(async (res) => {
        // console.log(res);
        const { latitude, longitude } = res.data;
        await this.setState({
          location: {
            lat: latitude,
            lng: longitude,
          },
          loading: false,
        });
        this.changeUserLocation();
      })
      .catch(() => {
        // console.log('fail to get ip location');
        this.setState({ loading: false });
      });
  }

  componentDidMount = async () => {
    await this.mapLocationPropsToState();
    const { location: { lat, lng } } = this.state;
    if (!lat || !lng) {
      await this.navigatorGeoLocation();
      if (!lat || !lng) {
        this.ipLocation();
      }
    }
  }

  updateCoords = async (coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    await this.setState({
      location: {
        lat,
        lng,
      },
    });
    this.changeUserLocation();
  }

  changeUserLocation = () => {
    const { changeUserLocation } = this.props;
    const { location } = this.state;

    changeUserLocation(location);
  }

  render() {
    const { loading, location } = this.state;
    const { google } = this.props;

    if (loading) return null;

    return (
      <div style={{ position: 'relative', height: '500px' }}>
        <Map
          onClick={(t, map, coord) => this.updateCoords(coord)}
          google={google}
          initialCenter={location}
          zoom={10}
        >
          <Marker
            onDragend={(t, map, coord) => this.updateCoords(coord)}
            name="Current location"
            position={location}
            draggable
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDZVkh6w_8zsKgHrE5_2LesCRtx72QMI4M',
})(MapContainer);

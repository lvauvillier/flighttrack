import React from 'react';
import PropTypes from 'prop-types';

import { withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';

const mapOptions = {
  rotateControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  mapTypeControlOptions: {
    position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
  },
};

const Map = ({ center, frames, time }) => (
  <GoogleMap
    defaultZoom={17}
    defaultCenter={center}
    options={mapOptions}
    mapTypeId={window.google.maps.MapTypeId.SATELLITE}
  >
    <Polyline
      key={`frames_${frames.length}`}
      path={
        frames.map(frame => ({
          lat: frame.latitude,
          lng: frame.longitude,
        }))
      }
      options={{
        strokeColor: '#ffffff',
        strokeWeight: 5,
        strokeOpacity: 0.3,
      }}
    />
    <Polyline
      path={
        frames.slice(0, time).map(frame => ({
          lat: frame.latitude,
          lng: frame.longitude,
        }))
      }
      options={{
        strokeColor: '#ffff00',
        strokeWeight: 5,
      }}
    />
    <Marker
      position={{ lat: frames[time].latitude, lng: frames[time].longitude }}
      icon={{
        path: 'M -10 5 L 0 -0 L 10 5 L 0 -20 z',
        strokeColor: '#e74c3c ',
        fillColor: '#e74c3c',
        fillOpacity: 1,
        rotation: Math.round(frames[time].yaw / 10),
      }}
    />


  </GoogleMap>
);

Map.propTypes = {
  center: PropTypes.object.isRequired,
  frames: PropTypes.array.isRequired,
  time: PropTypes.number.isRequired,
};

export default withGoogleMap(Map);

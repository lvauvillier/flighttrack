import React from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';

const Map = withGoogleMap(({ center, frames, time }) => (
  <GoogleMap
    defaultZoom={18}
    defaultCenter={center}
  >
    <Polyline
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
  </GoogleMap>
));

export default Map;

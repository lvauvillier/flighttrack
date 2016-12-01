import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const Map = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={18}
    defaultCenter={props.center}
  />
));

export default Map;

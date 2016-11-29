import { DATA_ADD_FLIGHTLOG } from '../actions/dataActions';

const initialState = {};

export default function data(state = initialState, action) {
  switch (action.type) {
    case DATA_ADD_FLIGHTLOG:
      return action.data || {};
    default:
      return state;
  }
}

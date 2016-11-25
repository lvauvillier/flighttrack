import {
  UI_TOGGLE_DRAWER, UI_CLOSE_DRAWER, UI_OPEN_DRAWER,
} from '../actions/uiActions';

const initialState = {
  drawerOpened: false,
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case UI_TOGGLE_DRAWER:
      return { ...state, drawerOpened: !state.drawerOpened };
    case UI_CLOSE_DRAWER:
      return { ...state, drawerOpened: false };
    case UI_OPEN_DRAWER:
      return { ...state, drawerOpened: true };
    default:
      return state;
  }
}

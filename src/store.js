import { createStore, combineReducers } from 'redux';
import dataReducer from './reducers/data';

const reducers = combineReducers({
  data: dataReducer,
});

export default function configureStore(initialState = {}) {
  const enhancer =
    window.devToolsExtension && process.env.NODE_ENV !== 'production'
      ? window.devToolsExtension()
      : f => f;
  return createStore(reducers, initialState, enhancer);
}

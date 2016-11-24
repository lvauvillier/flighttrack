import { createStore, compose } from 'redux';

const reducers = f => f;

export default function configureStore(initialState = {}) {
  const enhancer = compose(
    (window.devToolsExtension && process.env.NODE_ENV !== 'production') ? window.devToolsExtension() : f => f,
  );
  return createStore(reducers, initialState, enhancer);
}

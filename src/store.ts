import { GAUGE_VALUE_CHANGE } from './constants';

export interface IState {
  value: number;
}

export interface IStore {
  getState: () => IState;
}

export const attachStore = () => {
  return (target: HTMLElement, key: string) => {
    Object.defineProperty(target, key, {
      configurable: false,
      get: () => store
    });
  };
};

export const gaugeValueChangeAction = (value) => ({
  type: GAUGE_VALUE_CHANGE,
  value
});

export const initialState = {
  value: 0
};

export const gaugeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAUGE_VALUE_CHANGE:
      return {
        ...state,
        value: action.value
      }
  }

  return state;
};

export const createStore = (reducer) => {
  let state,
    listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

export const store = createStore(gaugeReducer);

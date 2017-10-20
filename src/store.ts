import { GAUGE_VALUE_CHANGE } from './constants';

export interface IState {
  value: number;
}

export interface IAction {
  type?: string;
}

export type IListener = () => void;
export type IUnsubscribe = () => void;

export interface IStore {
  getState: () => IState;
  dispatch: (action: IAction) => void;
  subscribe: (listener: IListener) => IUnsubscribe;
}

export interface IStatefulComponent {
  store: IStore;
}

export const attachStore = () => {
  return (target: HTMLElement, key: string) => {
    Object.defineProperty(target, key, {
      configurable: false,
      get: () => store
    });
  };
};

export const initialState = {
  value: 0
};

export const gaugeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAUGE_VALUE_CHANGE:
      return {
        ...state,
        value: action.value
      };
  }

  return state;
};

export const gaugeValueChangeAction = (value) => ({
  type: GAUGE_VALUE_CHANGE,
  value
});

export const createStore = (reducer): IStore => {
  let state,
    listeners = [];

  const getState = () => state;

  const dispatch = (action: IAction) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: IListener): IUnsubscribe => {
    listeners = [...listeners, listener];

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

export const store = createStore(gaugeReducer);

import { store } from './store';

function handleReady() {
  const gaugeEl = document.querySelector('app-gauge');

  const handleStoreChange = () => {
    const state = store.getState();

    gaugeEl.setAttribute('value', state.value.toString());
  };

  store.subscribe(handleStoreChange);
}

document.addEventListener('DOMContentLoaded', handleReady);

function handleReady() {
  const gaugeEl = document.querySelector('app-gauge');

  document.addEventListener('sliderChange', (e: CustomEvent) => {
    gaugeEl.setAttribute('value', e.detail.value);
  });
}

document.addEventListener('DOMContentLoaded', handleReady);

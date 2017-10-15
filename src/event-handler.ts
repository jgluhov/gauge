function handleReady() {
  const gaugeEl = document.querySelector('app-gauge');

  document.addEventListener('inputChange',
    (e: CustomEvent) =>
      gaugeEl.setAttribute('value', e.detail.value)
  );
}

document.addEventListener('DOMContentLoaded', handleReady);

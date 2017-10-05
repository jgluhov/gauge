function handleReady() {
  const gaugeEl = document.querySelector('app-gauge'),
    sliderEl = document.querySelector('.slider > input');

  sliderEl.addEventListener(
    'input',
    (e) => {
      e.stopPropagation();
      gaugeEl.setAttribute('value', (e.target as HTMLInputElement).value);
    },
    false
  );
}

document.addEventListener('DOMContentLoaded', handleReady);

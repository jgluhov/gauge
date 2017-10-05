function handleReady() {
  const gaugeEl = document.querySelector('app-gauge'),
    sliderEl = document.querySelector('.slider > input');

  console.log(gaugeEl);
  console.log(sliderEl);
}

document.addEventListener('DOMContentLoaded', handleReady);

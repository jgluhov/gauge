import { throttle } from 'lodash';
import {
  ANIMATION_DURATION
} from './constants';

import DOMUtil from './utils/dom-util';

function handleReady() {
  const gaugeEl = document.querySelector('app-gauge');

  document.addEventListener('sliderChange',
    throttle((e: CustomEvent) => {
      gaugeEl.setAttribute('value', e.detail.value);
    }, ANIMATION_DURATION * 2)
  );
}

document.addEventListener('DOMContentLoaded', handleReady);

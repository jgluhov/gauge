import DOMUtil from '../utils/dom-util';
import style = require('./styles.css');
import template from './template.html';

export default class Slider extends HTMLElement {
  private root: DocumentFragment;
  private sliderEl: HTMLInputElement;

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.root = DOMUtil.createShadowRoot(template, style);

    this.sliderEl = this.root.querySelector('input');
    this.sliderEl.addEventListener('input', this.handleSliderChange);

    shadow.appendChild(this.root);
  }

  private handleSliderChange(e) {
    document.dispatchEvent(
      new CustomEvent('sliderChange', {
        detail: {
          value: (e.target as HTMLInputElement).value,
        }
      })
    );
  }

  private disconnectedCallback() {
    this.sliderEl.removeEventListener(
      'input',
      this.handleSliderChange.bind(this),
      false
    );
  }

  private observedAttributes(): string[] {
    return [
      'value'
    ];
  }
}

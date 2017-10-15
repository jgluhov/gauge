import DOMService from '../../services/dom.service';

export default class Slider extends HTMLElement {
  private static handleSliderChange(e) {
    document.dispatchEvent(
      new CustomEvent('sliderChange', {
        detail: {
          value: (e.target as HTMLInputElement).value,
        }
      })
    );
  }

  private root: DocumentFragment;
  private sliderEl: HTMLInputElement;

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.root = DOMService.createShadowRoot(
      Slider.style,
      Slider.template
    );

    this.sliderEl = this.root.querySelector('input');
    this.sliderEl.addEventListener(
      'input', Slider.handleSliderChange
    );

    shadow.appendChild(this.root);
  }

  static get style() {
    return `
      :host {
        outline: 1px solid #dcdcdc;
      }
      :host,
      :host > input[type="range"] {
        height: 40px;
        width: 100%;
      }
      :host > input[type="range"] {
        margin: 0;
      }
    `;
  }

  static get template() {
    return `
      <input type="range"
        min="0"
        max="100"
        step="10"
        value="0"
        list="tickmarks"
      >
      <datalist id="tickmarks">
        <option value="0"></option>
        <option value="10"></option>
        <option value="20"></option>
        <option value="30"></option>
        <option value="40"></option>
        <option value="50"></option>
        <option value="60"></option>
        <option value="70"></option>
        <option value="80"></option>
        <option value="90"></option>
        <option value="100"></option>
      </datalist>
    `;
  }
}

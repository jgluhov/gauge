import DOMService from '../../services/dom.service';
import {
  attachStore,
  gaugeValueChangeAction,
  IStore
} from '../../store';

export default class Input extends HTMLElement {
  private root: DocumentFragment;
  private sliderEl: HTMLInputElement;

  @attachStore()
  private store: IStore;

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.root = DOMService.createShadowRoot(
      Input.style,
      Input.template
    );

    this.sliderEl = this.root.querySelector('input');
    this.sliderEl.addEventListener(
      'change', this.handleInputChange
    );

    shadow.appendChild(this.root);
  }

  private handleInputChange = (e) => {
    const inputValue = (e.target as HTMLInputElement).value;

    this.store.dispatch(gaugeValueChangeAction(inputValue));
  }

  static get style() {
    return `
      :host {
        font-family: Geneva, Arial, Helvetica, sans-serif;
      }
      :host > form > input {
        height: 40px;
        width: 80px;
        margin: 0;
        font-size: 18px;
        text-align: right;
        padding: 5px;
      }
      :host > form > label {
        margin-right: 5px;
      }
      :host > form > input:focus {
        outline: 0;
      }
      :host > form > input[type="number"]::-webkit-inner-spin-button,
      :host > form > input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `;
  }

  static get template() {
    return `
      <form novalidate>
        <label for="gauge-input">Value:</label>
        <input type="number" id="gauge-input" value="0" min="0" max="100">
      </form>
    `;
  }
}

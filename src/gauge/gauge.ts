import * as constants from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import arrayUtil from '../utils/array-util';
import DOMUtil from '../utils/dom-util';
import GaugeRenderer from './gauge-renderer';
import style = require('./gauge.css');
import template from './gauge.html';

class Gauge extends HTMLElement {
  private root: DocumentFragment;
  private svgEl: SVGElement;
  private renderer: GaugeRenderer;

  static get observedAttributes(): string[] {
    return [
      'value'
    ];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.root = DOMUtil.createShadowRoot(template, style);
    this.svgEl = this.root.querySelector('svg');
    this.renderer = new GaugeRenderer(this.svgEl);

    this.render();

    shadow.appendChild(this.root);
  }

  private connectedCallback() {
  }

  private attributeChangedCallback(
    attr: string,
    oldValue: string,
    newValue: string
  ) {
    if (attr === 'value') {
      this.renderer.rotateHand(Number(newValue));
    }
  }

  private render() {
    this.renderer.renderScale();
    this.renderer.renderAxis();
    this.renderer.renderHand();
  }
}

export default Gauge;

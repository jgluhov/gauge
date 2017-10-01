import * as constants from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import Segment from '../structures/segment';
import arrayUtil from '../utils/array-util';
import GaugeRenderer from './gauge-renderer';
import style = require('./gauge.css');
import template from './gauge.html';

class Gauge extends HTMLElement {
  private root: DocumentFragment;
  private svgEl: SVGElement;
  private renderer: GaugeRenderer;

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.root = this.createShadowRoot();
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
  }

  private render() {
    this.renderer.renderScale();
    this.renderer.renderAxis();
    this.renderer.renderHand();
  }

  /**
   * private createShadowRoot - creates svg element
   * with certain namespaces to work with further.
   *
   * @return {DocumentFragment} svg  / 4lement to display gauge
   */
  private createShadowRoot = (): DocumentFragment => {
    const templateEl = document.createElement('template'),
      styleEl = document.createElement('style'),
      content = document.createDocumentFragment();

    templateEl.innerHTML = template;
    styleEl.innerHTML = style;

    content.appendChild(styleEl);
    content.appendChild(templateEl.content);

    return content;
  }
}

export default Gauge;

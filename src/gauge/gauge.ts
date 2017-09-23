import SVGService from '../services/svg-service';
import style = require('./gauge.css');
import template from './gauge.html';

class Gauge extends HTMLElement {
  private root: DocumentFragment;
  private svgEl: SVGElement;

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
    this.gaugeScaleEl.setAttribute(
      'd', SVGService.describeArc(240, 270, 230, 0, Math.PI)
    );
  }

  /**
   * private createShadowRoot - creates svg element
   * with certain namespaces to work with further.
   *
   * @return {Node} svg element to display gauge
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

  private get gaugeScaleEl() {
    return this.svgEl.querySelector('.gauge__scale');
  }
}

export default Gauge;

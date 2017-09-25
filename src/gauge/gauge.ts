import * as constants from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import Segment from '../structures/segment';
import arrayUtil from '../utils/array-util';
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
    this.renderScale();
    this.renderAxis();
  }

  private renderScale() {
    const arcSegments = mathService.calculateArcSegments(
        constants.GAUGE_SCALE_START_ANGLE,
        constants.GAUGE_SCALE_END_ANGLE,
        constants.GAUGE_SCALE_RATIO
      );

    const parts = arrayUtil.zip(this.gaugeScaleElements, arcSegments);

    parts.forEach((part) => {
      const polylineEl = part.shift() as SVGPolylineElement,
        segment = part.shift() as Segment;

      polylineEl.setAttribute(
        'points', SVGService.generateArc(
          240, 115, 170, segment.startAngle, segment.endAngle
        )
      );
    });
  }

  private renderAxis() {

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

  private createPolylines = (): DocumentFragment => {
    const polyline = document.createElementNS(
      this.svgEl.getAttribute('xmlns'), 'polyline'
    ),
    fragment = document.createDocumentFragment();
    polyline.classList.add('gauge__scale');

    constants.GAUGE_SCALE_MODIFIERS.forEach(
      (modifier) => {
        const clone = (polyline.cloneNode(true) as SVGPolylineElement);
        clone.classList.add(modifier);
        fragment.appendChild(clone);
      });

    return fragment;
  }

  private get gaugeScaleGroupEl() {
    return this.svgEl.querySelector('#gauge-scale-group');
  }

  private get gaugeScaleElements() {
    const elements = this.gaugeScaleGroupEl.getElementsByTagName('polyline');

    if (!arrayUtil.size(elements)) {
      this.gaugeScaleGroupEl.appendChild(this.createPolylines());
    }

    return [].slice.call(elements);
  }
}

export default Gauge;

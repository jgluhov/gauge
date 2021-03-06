import {
  HAND_RADIUS,
  SCALE_DEFAULT_VALUE,
  SCALE_END_ANGLE,
  SCALE_PATH_COUNT,
  SCALE_RADIUS,
  SCALE_RATIO,
  SCALE_START_ANGLE,
  TICKS_COUNT,
  TICKS_INDENT,
  TICKS_LENGTH
} from '../../constants';

import DOMService, {IParams} from '../../services/dom.service';
import { attachStore } from '../../store';
import GaugeRenderService from './gauge-render.service';

export interface IGaugeParams extends IParams {
  endAngle: number;
  handRadius: number;
  scalePathCount: number;
  scaleRatio: number[];
  scaleRadius: number;
  startAngle: number;
  ticksIndent: number;
  ticksCount: number;
  ticksLength: number;
  value: number;
}

class Gauge extends HTMLElement {
  private params: IGaugeParams;
  private root: DocumentFragment;
  private svgEl: SVGElement;
  private renderService: GaugeRenderService;

  static get observedAttributes(): string[] {
    return [
      'value',
      'start-angle'
    ];
  }

  @attachStore()
  private store;

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.root = DOMService.createShadowRoot(
      Gauge.style,
      Gauge.template
    );

    this.params = this.readAttr();
    this.svgEl = this.root.querySelector('svg');

    this.renderService = new GaugeRenderService(this.svgEl, this.params);

    shadow.appendChild(this.root);
  }

  private connectedCallback() {
    this.render(this.params);
  }

  private attributeChangedCallback(attr: string) {
    this.params = this.readAttr();

    this.render(this.params);
    this.renderService.rotateHand(this.params);
  }

  private readAttr() {
    return DOMService.toParams(this.attributes, Gauge.defaultParams) as IGaugeParams;
  }

  private render(params: IGaugeParams) {
    this.renderService.renderScale(params);
    this.renderService.renderAxis(params);
    this.renderService.renderHand(params);
  }

  static get style() {
    return `
      :host {
        display: inline-block;
        height: 100%;
        width: 100%;
      }
      :host #gauge {
        transform-origin: 50% 50%;
        transform: scale(1,-1);
      }
      :host #gauge-scale-group > path {
        fill: transparent;
        stroke-width: 4;
        stroke-linecap: square;
      }
      :host #gauge-scale-group > path:nth-child(1) {
        stroke: #fb000e;
      }
      :host #gauge-scale-group > path:nth-child(2) {
        stroke: #fd9409;
      }
      :host #gauge-scale-group > path:nth-child(3) {
        stroke: #535353;
      }
      :host #gauge-lines-group > line {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke: #727272;
      }
      :host #gauge-texts-group > text {
        font-family: Lucida Console, Courier, monospace;
      }
      :host #gauge-hand-group > circle,
      :host #gauge-hand-group > path {
        fill: #1d84dd;
      }
    `;
  }

  static get template() {
    return `
      <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 320"
        id="gauge"
        width="480"
        height="320"
      >
        <title>Gauge</title>
        <defs>
          <path id="gauge-text-path" d=""></path>
        </defs>
        <g id="gauge-scale-group"></g>
            <g id="gauge-axis-group"></g>
            <g id="gauge-lines-group"></g>
            <g id="gauge-texts-group"></g>
        </g>
        <g id="gauge-hand-group"></g>
      </svg>
    `;
  }

  static get defaultParams(): IParams {
    return {
      endAngle: SCALE_END_ANGLE,
      handRadius: HAND_RADIUS,
      scalePathCount: SCALE_PATH_COUNT,
      scaleRadius: SCALE_RADIUS,
      scaleRatio: SCALE_RATIO,
      startAngle: SCALE_START_ANGLE,
      ticksCount: TICKS_COUNT,
      ticksIndent: TICKS_INDENT,
      ticksLength: TICKS_LENGTH,
      value: SCALE_DEFAULT_VALUE
    };
  }
}

export default Gauge;

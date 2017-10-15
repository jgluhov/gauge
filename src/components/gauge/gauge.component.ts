import DOMService from '../../services/dom.service';
import GaugeRenderService from './gauge-render.service';

class Gauge extends HTMLElement {
  private root: DocumentFragment;
  private svgEl: SVGElement;
  private renderService: GaugeRenderService;

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

    this.root = DOMService.createShadowRoot(
      Gauge.style,
      Gauge.template
    );

    this.svgEl = this.root.querySelector('svg');
    this.renderService = new GaugeRenderService(this.svgEl);

    this.render();

    shadow.appendChild(this.root);
  }

  private attributeChangedCallback(
    attr: string,
    oldValue: string,
    newValue: string
  ) {
    if (attr === 'value') {
      this.renderService.rotateHand(Number(newValue));
    }
  }

  private render() {
    this.renderService.renderScale();
    this.renderService.renderAxis();
    this.renderService.renderHand();
  }

  static get style() {
    return `
      :host {
        display: block;
        height: 320px;
        width: 480px;
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
       width="100%"
       height="100%"
      >
        <title>Gauge</title>
        <defs>
          <path id="gauge-text-path" d=""></path>
        </defs>
        <g id="gauge-scale-group"></g>
           <g id="gauge-axis-group">
           <g id="gauge-lines-group"></g>
           <g id="gauge-texts-group"></g>
         </g>
         <g id="gauge-hand-group"></g>
      </svg>
    `;
  }
}

export default Gauge;

type OBSERVED_ATTRIBUTES = string[];
type NAMESPACE = string;

class Gauge extends HTMLElement {
  private svgNS: NAMESPACE = 'http://www.w3.org/2000/svg';
  private svgEl: Element;

  static get observedAttributes(): OBSERVED_ATTRIBUTES {
    return [];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.svgEl = this.createSVGElement();

    shadow.appendChild(this.svgEl);
  }

  private connectedCallback() {
  }

  private attributeChangedCallback(
    attr: string,
    oldValue: string,
    newValue: string
  ) {
  }

  /**
   * private createSVGElement - creates svg element
   * with certain namespaces to work with further.
   *
   * @return {Element} svg element to display gauge
   */
  private createSVGElement() {
    const svgEl = document.createElementNS(this.svgNS, 'svg');
    return svgEl;
  }
}

export default Gauge;

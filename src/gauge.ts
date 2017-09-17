import template from 'templates/gauge';

class Gauge extends HTMLElement {
  private el: Node;

  static get observedAttributes(): string[] {
    return [];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({
      mode: 'open'
    });

    this.el = this.createSVGElement();

    shadow.appendChild(this.el);
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
   * @return {Node} svg element to display gauge
   */
  private createSVGElement(): Node {
    const templateEl = document.createElement('template');
    templateEl.innerHTML = template;

    return templateEl.content.firstElementChild.cloneNode(true);
  }
}

export default Gauge;

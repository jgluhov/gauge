type OBSERVED_ATTRIBUTES = string[];

class Gauge extends HTMLElement {

  static get observedAttributes(): OBSERVED_ATTRIBUTES {
    return [];
  }

  constructor() {
    super();
  }

  private connectedCallback() {
  }

  private attributeChangedCallback(
    attr: string,
    oldValue: string,
    newValue: string
  ) {
  }
}

export default Gauge;

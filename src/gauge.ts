type OBSERVED_ATTRIBUTES = string[];

class Gauge extends HTMLElement {

  static get observedAttributes(): OBSERVED_ATTRIBUTES {
    return [
      'some'
    ];
  }

  constructor() {
    super();
  }

  private connectedCallback() {
    console.log('Eahh we are here');
  }

  private attributeChangedCallback(
    attr: string,
    oldValue: string,
    newValue: string
  ) {
    console.log(attr, oldValue, newValue);
  }
}

export default Gauge;

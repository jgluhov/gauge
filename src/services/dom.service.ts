class DOMService {
  public static SVG_ELEMENT_NS = 'http://www.w3.org/2000/svg';
  /**
   * createShadowRoot - creates document fragment which
   * contains certain template ane style elements.
   * @static
   * @param {string} style CSS styles
   * @param {string} template HTML template
   * @returns {DocumentFragment} document fragment contained shadow dom
   */
  public static createShadowRoot(
    style: string,
    template: string,
  ): DocumentFragment {
    const templateEl = document.createElement('template'),
      styleEl = document.createElement('style'),
      content = document.createDocumentFragment();

    styleEl.innerHTML = style;
    templateEl.innerHTML = template;

    content.appendChild(styleEl);
    content.appendChild(templateEl.content);

    return content;
  }

  /**
   * static method createSVGElement - creates specific svg element(s)
   * with correct namespace.
   * @static
   * @param {string} tagName HTML tag name for element
   * @param {number} amount of tags to create
   * @return {DocumentFragment} document fragment contained svg element(s)
   */
  public static createSVGElement(
    tagName: string, amount: number = 1
  ): DocumentFragment {
    return new Array<number>(amount)
      .fill(0)
      .map(() => document.createElementNS(DOMService.SVG_ELEMENT_NS, tagName))
      .reduce((fragment: DocumentFragment, element) => {
        fragment.appendChild(element);
        return fragment;
      }, document.createDocumentFragment());
  }
}

export default DOMService;

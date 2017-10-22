import { defaults, defaultTo } from 'lodash';

export interface IParams {
  [key: string]: string | number | number[];
}

export default class DOMService {
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
   * @param {string} tagName for HTML element
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

  /**
   * static method toSettings - converts attributes NamedNodeMap
   * to specific object.
   *
   * @static
   * @param {NamedNodeMap} attributes to convert
   * @param {IParams} defaultParams for setting if some of an attribute is missed
   * @returns {IParams}
   */
  public static toParams(
    attributes: NamedNodeMap,
    defaultParams?: IParams
  ): IParams {
    const params = {},
      attrs = [].slice
      .call(attributes)
      .filter((attr) => attr.name !== 'class');

    attrs.forEach((attr) => {
      const key = DOMService.hyphenToCamelCase(attr.name);

      params[key] = defaultTo(Number(attr.value), attr.value);
    });

    return defaults(params, defaultParams);
  }

  public static hyphenToCamelCase(hyphen) {
    return hyphen
      .replace(/[.*+?^${}()|[\]\\]/g, '')
      .replace(/-([a-z])/g, (match) => match[1].toUpperCase());
  }
}

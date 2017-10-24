import { defaults, defaultTo } from 'lodash';

export type TParsedValue = string | number | Array<string | number>;

export interface IParams {
  [key: string]: TParsedValue;
}

export default class DOMService {
  public static SVG_ELEMENT_NS = 'http://www.w3.org/2000/svg';
  public static ESCAPED_SYMBOLS_REGEXP = /[.*+?^@±§`~/%$!{}()|\\]/g;
  public static ARRAY_PRESENTATION_REGEXP = /^\[(\d|".*?")*(?:, *?(\d|".*?")+)*]$/g;

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
      .replace(DOMService.ESCAPED_SYMBOLS_REGEXP, '')
      .replace(/-([a-z])/g, (match) => match[1].toUpperCase());
  }

  /**
   * parse - method for parsing string value
   * @static
   * @param {string} attrValue literal string representation
   * @returns {TParsedValue}
   */
  public static parseAttr(attrValue: string): TParsedValue  {
    const escapedValue = attrValue.replace(DOMService.ESCAPED_SYMBOLS_REGEXP, ''),
      isEmpty = !escapedValue,
      isNumber = !isNaN(Number(escapedValue)),
      isArray = DOMService.ARRAY_PRESENTATION_REGEXP.test(escapedValue),
      isString = !isNumber && !isArray;

    if (isEmpty) {
      return;
    }

    if (isString) {
      return attrValue.replace(/["]/g, '');
    }

    if (isNumber) {
      return Number(escapedValue);
    }

    if (isArray) {
      const result = escapedValue
        .match(DOMService.ARRAY_PRESENTATION_REGEXP)
        .shift()
        .slice(1, -1)
        .split(',')
        .filter((item) => item.trim())
        .map((item) => DOMService.parseAttr(item.trim()));

      if (result.length) {
        return result;
      }
    }
  }
}

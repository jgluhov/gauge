import {
  SVG_NAMESPACE
} from '../constants';

class DOMUtil {
  private throttleOptions: IThrottleOptions = {
    leading: true,
    trailing: true
  };

  /**
   * private createShadowRoot - creates svg element
   * with certain namespaces to work with further.
   *
   * @return {DocumentFragment} svg element to display gauge
   */
  public createShadowRoot = (template, style): DocumentFragment => {
    const templateEl = document.createElement('template'),
      styleEl = document.createElement('style'),
      content = document.createDocumentFragment();

    templateEl.innerHTML = template;
    styleEl.innerHTML = style;

    content.appendChild(styleEl);
    content.appendChild(templateEl.content);

    return content;
  }

  public createElement = (tagName, count = 1): DocumentFragment => {
    return new Array(count)
      .fill(0)
      .map(() => document.createElementNS(SVG_NAMESPACE, tagName))
      .reduce((fragment: DocumentFragment, element) => {
        fragment.appendChild(element);
        return fragment;
      }, document.createDocumentFragment());
  }  
}

export default new DOMUtil();

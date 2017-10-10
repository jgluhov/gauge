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
   * @return {DocumentFragment} svg  / 4lement to display gauge
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

  /**
   * Source code was brought from UnderscoreJS
   */
  public throttle(fn, delay, options = this.throttleOptions) {
    let context,
      args,
      result,
      timeout = null,
      previous = 0;

    const later = () => {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = fn.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    };

    return function() {
      const now = Date.now();

      if ( !previous && options.leading === false ) {
        previous = now;
      }

      const remaining = delay - (now - previous);
      context = this;
      args = arguments;

      if (remaining <= 0 || remaining > delay) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = fn.apply(context, args);

        if ( !timeout ) {
          context = args = null;
        }
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  }
}

export default new DOMUtil();

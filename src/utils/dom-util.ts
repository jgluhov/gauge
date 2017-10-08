class DOMUtil {
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
}

export default new DOMUtil();

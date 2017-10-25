import {
  SCALE_PATH_COUNT,
  TICKS_COUNT
} from '../../constants';

import DOMService from '../../services/dom.service';

class QueryService {
  constructor(public svgEl: SVGElement) {
  }

  public get gaugeScaleElements(): SVGElement[] {
    if (!this.gaugeScaleGroupEl.hasChildNodes()) {
      this.gaugeScaleGroupEl.appendChild(
        DOMService.createSVGElement('path', SCALE_PATH_COUNT)
      );
    }

    return [].slice.call(this.gaugeScaleGroupEl.children);
  }

  public get gaugeLinesElements(): SVGElement[] {
    if (!this.gaugeLinesGroupEl.hasChildNodes()) {
      this.gaugeLinesGroupEl.appendChild(
        DOMService.createSVGElement('line', TICKS_COUNT)
      );
    }

    return [].slice.call(this.gaugeLinesGroupEl.children);
  }

  public get gaugeTextsElements(): SVGElement[] {
    if (!this.gaugeTextsGroupEl.hasChildNodes()) {
      this.gaugeTextsGroupEl.appendChild(
        DOMService.createSVGElement('text', TICKS_COUNT)
      );

      Array.from(this.gaugeTextsGroupEl.children)
        .forEach((el) => el.appendChild(
          DOMService.createSVGElement('textPath'))
        );
    }

    return [].slice.call(this.gaugeTextsGroupEl.children);
  }

  public get gaugeHandElements(): SVGElement[] {
    if (!this.gaugeHandGroupEl.hasChildNodes()) {
      this.gaugeHandGroupEl.appendChild(
        DOMService.createSVGElement('circle')
      );
      this.gaugeHandGroupEl.appendChild(
        DOMService.createSVGElement('path')
      );
    }

    return [].slice.call(this.gaugeHandGroupEl.children);
  }

  public get arrowEl(): SVGElement {
    return this.gaugeHandElements.pop();
  }

  public get gaugeScaleGroupEl() {
    return this.svgEl.querySelector('#gauge-scale-group');
  }

  public get gaugeLinesGroupEl() {
    return this.svgEl.querySelector('#gauge-lines-group');
  }

  public get gaugeTextsGroupEl() {
    return this.svgEl.querySelector('#gauge-texts-group');
  }

  public get gaugeTextPathEl(): SVGPathElement {
    return this.svgEl.querySelector('#gauge-text-path') as SVGPathElement;
  }

  public get gaugeHandGroupEl() {
    return this.svgEl.querySelector('#gauge-hand-group');
  }

  public get centerX(): number {
    return this.svgEl.clientWidth / 2;
  }

  public get centerY(): number {
    return this.svgEl.clientHeight / 2;
  }
}

export default QueryService;

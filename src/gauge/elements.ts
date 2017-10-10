import {
  SCALE_PATH_COUNT,
  TICKS_COUNT
} from '../constants';

import DOMUtil from '../utils/dom-util';

class Elements {
  constructor(public svgEl: SVGElement) {
  }

  public get gaugeScaleElements(): SVGElement[] {
    if (!this.gaugeScaleGroupEl.hasChildNodes()) {
      this.gaugeScaleGroupEl.appendChild(
        DOMUtil.createElement('path', SCALE_PATH_COUNT)
      );
    }

    return [].slice.call(this.gaugeScaleGroupEl.children);
  }

  public get gaugeLinesElements(): SVGElement[] {
    if (!this.gaugeLinesGroupEl.hasChildNodes()) {
      this.gaugeLinesGroupEl.appendChild(
        DOMUtil.createElement('line', TICKS_COUNT)
      );
    }

    return [].slice.call(this.gaugeLinesGroupEl.children);
  }

  public get gaugeTextsElements(): SVGElement[] {
    if (!this.gaugeTextsGroupEl.hasChildNodes()) {
      this.gaugeTextsGroupEl.appendChild(
        DOMUtil.createElement('text', TICKS_COUNT)
      );

      Array.from(this.gaugeTextsGroupEl.children)
        .forEach((el) => el.appendChild(DOMUtil.createElement('textPath')));
    }

    return [].slice.call(this.gaugeTextsGroupEl.children);
  }

  public get gaugeHandElements(): SVGElement[] {
    if (!this.gaugeHandGroupEl.hasChildNodes()) {
      this.gaugeHandGroupEl.appendChild(DOMUtil.createElement('circle'));
      this.gaugeHandGroupEl.appendChild(DOMUtil.createElement('path'));
    }

    return [].slice.call(this.gaugeHandGroupEl.children);
  }

  public get gaugeScaleGroupEl() {
    return this.svgEl.querySelector('#gauge-scale-group');
  }

  public get gaugeAxisGroupEl() {
    return this.svgEl.querySelector('#gauge-axis-group');
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

  public get gaugeScaleLength(): number {
    return this.gaugeTextPathEl.getTotalLength();
  }

  public get gaugeHandGroupEl() {
    return this.svgEl.querySelector('#gauge-hand-group');
  }
}

export default Elements;

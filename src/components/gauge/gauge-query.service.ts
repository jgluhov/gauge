import DOMService from '../../services/dom.service';
import {IGaugeParams} from './gauge.component';

class QueryService {
  private GAUGE_SCALE_GROUP_ID = '#gauge-scale-group';
  private GAUGE_LINES_GROUP_ID = '#gauge-lines-group';
  private GAUGE_TEXTS_GROUP_ID = '#gauge-texts-group';
  private GAUGE_TEXT_PATH_ID = '#gauge-text-path';
  private GAUGE_HAND_GROUP_ID = '#gauge-hand-group';

  constructor(
    public svgEl: SVGElement,
    public params: IGaugeParams
  ) {}

  public get gaugeScaleElements(): SVGElement[] {
    if (!this.gaugeScaleGroupEl.hasChildNodes()) {
      this.gaugeScaleGroupEl.appendChild(
        DOMService.createSVGElement('path', this.params.scalePathCount)
      );
    }

    return [].slice.call(this.gaugeScaleGroupEl.children);
  }

  public get gaugeLinesElements(): SVGElement[] {
    if (!this.gaugeLinesGroupEl.hasChildNodes()) {
      this.gaugeLinesGroupEl.appendChild(
        DOMService.createSVGElement('line', this.params.ticksCount)
      );
    }

    return [].slice.call(this.gaugeLinesGroupEl.children);
  }

  public get gaugeTextsElements(): SVGElement[] {
    if (!this.gaugeTextsGroupEl.hasChildNodes()) {
      this.gaugeTextsGroupEl.appendChild(
        DOMService.createSVGElement('text', this.params.ticksCount)
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
    return this.svgEl.querySelector(this.GAUGE_SCALE_GROUP_ID);
  }

  public get gaugeLinesGroupEl() {
    return this.svgEl.querySelector(this.GAUGE_LINES_GROUP_ID);
  }

  public get gaugeTextsGroupEl() {
    return this.svgEl.querySelector(this.GAUGE_TEXTS_GROUP_ID);
  }

  public get gaugeTextPathEl(): SVGPathElement {
    return this.svgEl.querySelector(this.GAUGE_TEXT_PATH_ID) as SVGPathElement;
  }

  public get gaugeHandGroupEl() {
    return this.svgEl.querySelector(this.GAUGE_HAND_GROUP_ID);
  }

  public get centerX(): number {
    return this.svgEl.clientWidth / 2;
  }

  public get centerY(): number {
    return this.svgEl.clientHeight / 2;
  }

  public get offsetCenterY(): number {
    return this.centerY - 45;
  }
}

export default QueryService;

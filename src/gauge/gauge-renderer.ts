import * as constants from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import Point from '../structures/point';
import Segment from '../structures/segment';
import arrayUtil from '../utils/array-util';

class GaugeRenderer {
  private centerX: number;
  private centerY: number;
  private scaleRadius: number;
  private ticksIndent: number;
  private ticksLength: number;
  private startAngle: number;
  private endAngle: number;
  private scaleRatio: number[];
  private ticksCount: number;

  constructor(private svgEl: SVGElement) {
    this.centerX = constants.GAUGE_SCALE_CENTER_X;
    this.centerY = constants.GAUGE_SCALE_CENTER_Y;
    this.scaleRadius = constants.GAUGE_SCALE_RADIUS;
    this.startAngle = constants.GAUGE_SCALE_START_ANGLE;
    this.endAngle = constants.GAUGE_SCALE_END_ANGLE;
    this.scaleRatio = constants.GAUGE_SCALE_RATIO;
    this.ticksCount = constants.GAUGE_TICKS_COUNT;
    this.ticksIndent = constants.GAUGE_TICKS_INDENT;
    this.ticksLength = constants.GAUGE_TICKS_LENGTH;
  }

  public renderScale() {
    const segs = mathService.calcSegments(
        this.startAngle,
        this.endAngle,
        this.scaleRatio
      );

    Array.from(this.gaugeScaleElements)
      .forEach((el, indx) => {
        el.setAttribute(
          'd', SVGService.generateArc(
            this.centerX,
            this.centerY,
            this.scaleRadius,
            segs[indx].start,
            segs[indx].end
          )
        );
      });
  }

  public renderAxis() {
    this.gaugeTextPathEl.setAttribute(
      'd', SVGService.generateArc(
        this.centerX, this.centerY,
        this.scaleRadius + (2 * this.ticksIndent) + this.ticksLength,
        this.startAngle,
        this.endAngle
      )
    );

    // const axis = mathService.calcAxis(
    //   this.centerX,
    //   this.centerY,
    //   this.scaleRadius,
    //   this.startAngle,
    //   this.endAngle,
    //   this.ticksCount,
    //   this.gaugeScaleLength
    // );

    this.renderTicks();
    // this.renderTexts(axis);
  }

  public renderHand() {
    const circleEl = this.gaugeHandElements.shift(),
      arrowEl = this.gaugeHandElements.pop();

    circleEl.setAttribute('cx', constants.GAUGE_SCALE_CENTER_X.toString());
    circleEl.setAttribute('cy', constants.GAUGE_SCALE_CENTER_Y.toString());
    circleEl.setAttribute('r', constants.GAUGE_HAND_RADIUS.toString());

    arrowEl.setAttribute('d', SVGService.describeHand());
    arrowEl.setAttribute('transform', `
      translate(${2 * constants.GAUGE_SCALE_CENTER_X},0)
      scale(-1, 1)
      rotate(
        ${mathService.radiansToHandPosition(constants.GAUGE_SCALE_START_ANGLE)}
        ${constants.GAUGE_SCALE_CENTER_X} ${constants.GAUGE_SCALE_CENTER_Y}
      )
    `);
  }

  private renderTicks() {
    const ticks = mathService.generateTicks(
      this.centerX,
      this.centerY,
      this.startAngle,
      this.endAngle,
      this.scaleRadius + this.ticksIndent,
      this.ticksCount
    );

    Array.from(this.gaugeLinesElements)
      .forEach((el, i) => {
        const attr = el.setAttribute.bind(el),
          tick = ticks[i];

        attr('x1', tick.p1.x);
        attr('y1', tick.p1.y);
        attr('x2', tick.p2.x);
        attr('y2', tick.p2.y);
      }
    );
  }

  private renderTexts(axis: IAxis) {
    Array.from(this.gaugeTextsElements)
      .forEach((el, i: number) => {
        const textPathEl = el.firstElementChild,
          text = axis[i].text;

        el.setAttribute('x', text.x.toString());
        el.setAttribute('text-anchor', 'middle');
        // el.setAttribute('transform', `
        //   translate(${2 * text.p.x},0)
        //   scale(-1, 1)
        //   rotate(${text.degree} ${text.p.x} ${text.p.y})
        // `);
        textPathEl.setAttribute('href', '#gauge-text-path');
        textPathEl.textContent = text.content;
      });
  }

  private createElement = (tagName, count = 1): DocumentFragment => {
    return new Array(count)
      .fill(0)
      .map(() => {
        return document.createElementNS(
          this.svgEl.getAttribute('xmlns'), tagName
        );
      })
      .reduce((fragment: DocumentFragment, element) => {
        fragment.appendChild(element);
        return fragment;
      }, document.createDocumentFragment());
  }

  private get gaugeScaleElements(): SVGElement[] {
    if (!this.gaugeScaleGroupEl.hasChildNodes()) {
      this.gaugeScaleGroupEl.appendChild(
        this.createElement('path', constants.GAUGE_SCALE_PATH_COUNT)
      );
    }

    return [].slice.call(this.gaugeScaleGroupEl.children);
  }

  private get gaugeLinesElements(): SVGElement[] {
    if (!this.gaugeLinesGroupEl.hasChildNodes()) {
      this.gaugeLinesGroupEl.appendChild(
        this.createElement('line', constants.GAUGE_TICKS_COUNT)
      );
    }

    return [].slice.call(this.gaugeLinesGroupEl.children);
  }

  private get gaugeTextsElements(): SVGElement[] {
    if (!this.gaugeTextsGroupEl.hasChildNodes()) {
      this.gaugeTextsGroupEl.appendChild(
        this.createElement('text', constants.GAUGE_TICKS_TEXT_COUNT)
      );

      Array.from(this.gaugeTextsGroupEl.children)
        .forEach((el) => el.appendChild(this.createElement('textPath')));
    }

    return [].slice.call(this.gaugeTextsGroupEl.children);
  }

  private get gaugeHandElements(): SVGElement[] {
    if (!this.gaugeHandGroupEl.hasChildNodes()) {
      this.gaugeHandGroupEl.appendChild(this.createElement('circle'));
      this.gaugeHandGroupEl.appendChild(this.createElement('path'));
    }

    return [].slice.call(this.gaugeHandGroupEl.children);
  }

  private get gaugeScaleGroupEl() {
    return this.svgEl.querySelector('#gauge-scale-group');
  }

  private get gaugeAxisGroupEl() {
    return this.svgEl.querySelector('#gauge-axis-group');
  }

  private get gaugeLinesGroupEl() {
    return this.svgEl.querySelector('#gauge-lines-group');
  }

  private get gaugeTextsGroupEl() {
    return this.svgEl.querySelector('#gauge-texts-group');
  }

  private get gaugeTextPathEl(): SVGPathElement {
    return this.svgEl.querySelector('#gauge-text-path') as SVGPathElement;
  }

  private get gaugeScaleLength(): number {
    return this.gaugeTextPathEl.getTotalLength();
  }

  private get gaugeHandGroupEl() {
    return this.svgEl.querySelector('#gauge-hand-group');
  }
}

export default GaugeRenderer;

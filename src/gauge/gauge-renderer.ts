import {
  HAND_RADIUS,
  SCALE_CENTER_X,
  SCALE_CENTER_Y,
  SCALE_END_ANGLE,
  SCALE_PATH_COUNT,
  SCALE_RADIUS,
  SCALE_RATIO,
  SCALE_START_ANGLE,
  TICKS_COUNT,
  TICKS_INDENT,
  TICKS_LENGTH
} from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import Point from '../structures/point';
import Slice from '../structures/slice';
import arrayUtil from '../utils/array-util';

class GaugeRenderer {
  constructor(private svgEl: SVGElement) {
  }

  public renderScale() {
    const slices = mathService.calcSlices(
      SCALE_START_ANGLE, SCALE_END_ANGLE, SCALE_RATIO
    );

    Array.from(this.gaugeScaleElements)
      .forEach((el, indx) => {
        el.setAttribute(
          'd', SVGService.describeArc(
            SCALE_CENTER_X,
            SCALE_CENTER_Y,
            SCALE_RADIUS,
            slices[indx].startAngle,
            slices[indx].endAngle
          )
        );
      });
  }

  public renderAxis() {
    this.gaugeTextPathEl.setAttribute(
      'd', SVGService.describeArc(
        SCALE_CENTER_X,
        SCALE_CENTER_Y,
        SCALE_RADIUS + (2 * TICKS_INDENT) + TICKS_LENGTH,
        SCALE_START_ANGLE,
        SCALE_END_ANGLE
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

    circleEl.setAttribute('cx', SCALE_CENTER_X.toString());
    circleEl.setAttribute('cy', SCALE_CENTER_Y.toString());
    circleEl.setAttribute('r', HAND_RADIUS.toString());

    arrowEl.setAttribute('d', SVGService.describeHand(
      SCALE_CENTER_X,
      SCALE_CENTER_Y,
      SCALE_RADIUS,
      HAND_RADIUS,
      TICKS_INDENT,
      TICKS_LENGTH
    ));

    arrowEl.setAttribute('transform', `
      translate(${2 * SCALE_CENTER_X},0)
      scale(-1, 1)
      rotate(
        ${mathService.radiansToHandPosition(SCALE_START_ANGLE)}
        ${SCALE_CENTER_X} ${SCALE_CENTER_Y}
      )
    `);
  }

  private renderTicks() {
    const ticks = mathService.generateTicks(
      SCALE_CENTER_X,
      SCALE_CENTER_Y,
      SCALE_START_ANGLE,
      SCALE_END_ANGLE,
      SCALE_RADIUS + TICKS_INDENT,
      TICKS_COUNT
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
        this.createElement('path', SCALE_PATH_COUNT)
      );
    }

    return [].slice.call(this.gaugeScaleGroupEl.children);
  }

  private get gaugeLinesElements(): SVGElement[] {
    if (!this.gaugeLinesGroupEl.hasChildNodes()) {
      this.gaugeLinesGroupEl.appendChild(
        this.createElement('line', TICKS_COUNT)
      );
    }

    return [].slice.call(this.gaugeLinesGroupEl.children);
  }

  private get gaugeTextsElements(): SVGElement[] {
    if (!this.gaugeTextsGroupEl.hasChildNodes()) {
      this.gaugeTextsGroupEl.appendChild(
        this.createElement('text', TICKS_COUNT)
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

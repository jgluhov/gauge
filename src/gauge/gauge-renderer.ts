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
  private prevPositionAngle: number = SCALE_END_ANGLE;

  constructor(private svgEl: SVGElement) {
  }

  public renderScale() {
    const slices = mathService.generateSlices(
      SCALE_START_ANGLE, SCALE_END_ANGLE, SCALE_RATIO
    );

    Array.from(this.gaugeScaleElements)
      .forEach((el, indx) => {
        const slice = slices.next().value;

        el.setAttribute(
          'd', SVGService.describeArc(
            SCALE_CENTER_X,
            SCALE_CENTER_Y,
            SCALE_RADIUS,
            slice.startAngle,
            slice.endAngle
          )
        );
      });
  }

  public renderAxis() {
    this.renderTicks();
    this.renderTexts();
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
  }

  public rotateHand(position: number) {
    const arrowEl = this.gaugeHandElements.pop(),
      centralAngle = mathService.calcCentralAngle(
        SCALE_START_ANGLE,
        SCALE_END_ANGLE
      ),
      positionAngle = SCALE_END_ANGLE - mathService.calcRatio(
        centralAngle,
        position
      ),
      direction = this.prevPositionAngle > positionAngle ? -1 : 1,
      slice = Math.abs(this.prevPositionAngle - positionAngle);

    this.animate(
      (timeFraction) => {
        const time = (timeFraction / 1000) * 2;
        arrowEl.setAttribute('transform',
          SVGService.describeRotation(this.prevPositionAngle + direction * (time * slice))
        );
      },
      500,
      () => {
        this.prevPositionAngle = positionAngle;
      });
  }

  private animate(handler, duration, complete) {
    const start = performance.now();

    requestAnimationFrame(function animate(timestamp) {
      let timePassed = timestamp - start;

      if (timePassed > duration) {
        timePassed = duration;
      }

      handler(timePassed);

      if (timePassed < duration) {
        requestAnimationFrame(animate);
      } else {
        complete();
      }
    });
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
          tick = ticks.next().value;

        attr('x1', tick.p1.x);
        attr('y1', tick.p1.y);
        attr('x2', tick.p2.x);
        attr('y2', tick.p2.y);
      }
    );
  }

  private renderTexts() {
    this.gaugeTextPathEl.setAttribute(
      'd', SVGService.describeArc(
        SCALE_CENTER_X,
        SCALE_CENTER_Y,
        SCALE_RADIUS + (2 * TICKS_INDENT) + TICKS_LENGTH,
        SCALE_START_ANGLE,
        SCALE_END_ANGLE
      )
    );

    const texts = mathService.generateTexts(
      SCALE_CENTER_X,
      SCALE_CENTER_Y,
      SCALE_RADIUS,
      SCALE_START_ANGLE,
      SCALE_END_ANGLE,
      TICKS_COUNT,
      this.gaugeScaleLength
    );

    Array.from(this.gaugeTextsElements)
      .forEach((el, i: number) => {
        const textPathEl = el.firstElementChild,
          text = texts.next().value;

        el.setAttribute('x', text.position.toString());
        el.setAttribute('text-anchor', 'start');
        el.setAttribute('transform', `
          translate(${2 * text.point.x},0)
          scale(-1, 1)
          rotate(${text.degree} ${text.point.x} ${text.point.y})
        `);

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

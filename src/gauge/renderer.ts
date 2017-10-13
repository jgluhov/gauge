import {
  ANIMATION_DURATION,
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
import animateUtil from '../utils/animate-util';
import DOMUtil from '../utils/dom-util';
import Elements from './elements';

class Renderer {
  private currentAngle: number = (SCALE_END_ANGLE - SCALE_START_ANGLE) / 2;
  private elements: Elements;

  constructor(svgEl: SVGElement) {
    this.elements = new Elements(svgEl);
  }

  public renderScale() {
    const slices = mathService.generateSlices(
      SCALE_START_ANGLE, SCALE_END_ANGLE, SCALE_RATIO
    );

    Array.from(this.elements.gaugeScaleElements)
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
    const circleEl = this.elements.gaugeHandElements.shift(),
      arrowEl = this.elements.gaugeHandElements.pop();

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
    const arrowEl = this.elements.gaugeHandElements.pop(),
      centralAngle = mathService.calcCentralAngle(
        SCALE_START_ANGLE,
        SCALE_END_ANGLE
      ),
      positionAngle = SCALE_END_ANGLE - mathService.calcRatio(
        centralAngle,
        position
      ),
      slice = new Slice(this.currentAngle, positionAngle);

    animateUtil.animateHand(
      (rotateAngle) => {
        arrowEl.setAttribute('transform',
          SVGService.describeRotation(rotateAngle)
        );
      },
      slice,
      ANIMATION_DURATION,
      this.setCurrentAngle
    );
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

    Array.from(this.elements.gaugeLinesElements)
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
    this.elements.gaugeTextPathEl.setAttribute(
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
      this.elements.gaugeScaleLength
    );

    Array.from(this.elements.gaugeTextsElements)
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

  private setCurrentAngle = (angle) => {
    this.currentAngle = angle;
  }
}

export default Renderer;

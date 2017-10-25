import {
  HAND_RADIUS,
  SCALE_CENTER_X,
  SCALE_CENTER_Y,
  SCALE_END_ANGLE,
  SCALE_RADIUS,
  SCALE_RATIO,
  SCALE_START_ANGLE,
  TICKS_COUNT,
  TICKS_INDENT,
  TICKS_LENGTH
} from '../../constants';

import AnimationService from '../../services/animation.service';
import DOMService, { IParams } from '../../services/dom.service';
import MathService from '../../services/math.service';
import SVGService from '../../services/svg.service';
import Slice from '../../structures/slice';
import GaugeQueryService from './gauge-query.service';
import {IGaugeParams} from './gauge.component';

class GaugeRenderService {
  private currentAngle: number = (
    SCALE_END_ANGLE - (SCALE_END_ANGLE - SCALE_START_ANGLE) / 2
  );

  private centralAngle = MathService.calcCentralAngle(
    SCALE_START_ANGLE,
    SCALE_END_ANGLE
  );

  private queryService: GaugeQueryService;
  private mathService: MathService;
  private svgService: SVGService;
  private animationService: AnimationService;

  constructor(svgEl: SVGElement) {
    this.queryService = new GaugeQueryService(svgEl);
    this.mathService = new MathService();
    this.svgService = new SVGService();
    this.animationService = new AnimationService();
  }

  public renderScale(params: IGaugeParams) {
    const slices = this.mathService.generateSlices(
      params.startAngle, params.endAngle, params.scaleRatio
    );

    Array.from(this.queryService.gaugeScaleElements)
      .forEach((el) => {
        const slice = slices.next().value;

        el.setAttribute(
          'd', this.svgService.describeArc(
            this.queryService.centerX,
            this.queryService.centerY - this.queryService.centerY / 3,
            params.scaleRadius,
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
    const circleEl = this.queryService.gaugeHandElements.shift(),
      arrowEl = this.queryService.gaugeHandElements.pop();

    circleEl.setAttribute('cx', SCALE_CENTER_X.toString());
    circleEl.setAttribute('cy', SCALE_CENTER_Y.toString());
    circleEl.setAttribute('r', HAND_RADIUS.toString());

    arrowEl.setAttribute('d', this.svgService.describeHand(
      this.queryService.centerX,
      this.queryService.centerY - this.queryService.centerY / 3,
      SCALE_RADIUS,
      HAND_RADIUS,
      TICKS_INDENT,
      TICKS_LENGTH
    ));
  }

  public rotateHand(value) {
    const slice = new Slice(
      this.currentAngle,
      SCALE_END_ANGLE - MathService.calcRatio(
        this.centralAngle,
        value
      ));

    this.animateHand(slice);
  }

  private animateHand(slice) {
    this.animationService.animateHand(
      (rotateAngle) => {
        this.queryService.arrowEl.setAttribute('transform',
          SVGService.describeRotation(rotateAngle)
        );
      },
      slice,
      this.setCurrentAngle
    );
  }

  private renderTicks() {
    const ticks = this.mathService.generateTicks(
      this.queryService.centerX,
      this.queryService.centerY - this.queryService.centerY / 3,
      SCALE_START_ANGLE,
      SCALE_END_ANGLE,
      SCALE_RADIUS + TICKS_INDENT,
      TICKS_COUNT
    );

    Array.from(this.queryService.gaugeLinesElements)
      .forEach((el) => {
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
    this.queryService.gaugeTextPathEl.setAttribute(
      'd', this.svgService.describeArc(
        this.queryService.centerX,
        this.queryService.centerY - this.queryService.centerY / 3,
        SCALE_RADIUS + (2 * TICKS_INDENT) + TICKS_LENGTH,
        SCALE_START_ANGLE,
        SCALE_END_ANGLE
      )
    );

    const texts = this.mathService.generateTexts(
      this.queryService.centerX,
      this.queryService.centerY - this.queryService.centerY / 3,
      SCALE_RADIUS,
      SCALE_START_ANGLE,
      SCALE_END_ANGLE,
      TICKS_COUNT,
      this.queryService.gaugeTextPathEl.getTotalLength()
    );

    Array.from(this.queryService.gaugeTextsElements)
      .forEach((el) => {
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

export default GaugeRenderService;

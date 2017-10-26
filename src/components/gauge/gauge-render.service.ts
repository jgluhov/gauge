import AnimationService from '../../services/animation.service';
import MathService from '../../services/math.service';
import SVGService from '../../services/svg.service';
import Slice from '../../structures/slice';
import GaugeQueryService from './gauge-query.service';
import {IGaugeParams} from './gauge.component';

class GaugeRenderService {
  private static getCentralAngle(params) {
    return MathService.calcCentralAngle(
      params.startAngle,
      params.endAngle
    );
  }

  private currentAngle: number;

  private queryService: GaugeQueryService;
  private mathService: MathService;
  private svgService: SVGService;
  private animationService: AnimationService;

  constructor(svgEl: SVGElement, params: IGaugeParams) {
    this.queryService = new GaugeQueryService(svgEl, params);
    this.mathService = new MathService();
    this.svgService = new SVGService();
    this.animationService = new AnimationService();

    this.setCurrentAngle(
      params.endAngle - (params.endAngle - params.startAngle) / 2
    );
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
            this.queryService.offsetCenterY,
            params.scaleRadius,
            slice.startAngle,
            slice.endAngle
          )
        );
      });
  }

  public renderAxis(params: IGaugeParams) {
    this.renderTicks(params);
    this.renderTexts(params);
  }

  public renderHand(params: IGaugeParams) {
    const circleEl = this.queryService.gaugeHandElements.shift(),
      arrowEl = this.queryService.gaugeHandElements.pop();

    circleEl.setAttribute('cx', this.queryService.centerX.toString());
    circleEl.setAttribute('cy', this.queryService.offsetCenterY.toString());
    circleEl.setAttribute('r', params.handRadius.toString());

    arrowEl.setAttribute('d', this.svgService.describeHand(
      this.queryService.centerX,
      this.queryService.offsetCenterY,
      params.scaleRadius,
      params.handRadius,
      params.ticksIndent,
      params.ticksLength
    ));
  }

  public rotateHand(params: IGaugeParams) {
    const slice = new Slice(
      this.currentAngle,
      params.endAngle - MathService.calcRatio(
        GaugeRenderService.getCentralAngle(params), params.value
      ));

    this.animateHand(slice);
  }

  private renderTicks(params: IGaugeParams) {
    const ticks = this.mathService.generateTicks(
      this.queryService.centerX,
      this.queryService.offsetCenterY,
      params.startAngle,
      params.endAngle,
      params.scaleRadius + params.ticksIndent,
      params.ticksCount
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

  private renderTexts(params: IGaugeParams) {
    this.queryService.gaugeTextPathEl.setAttribute(
      'd', this.svgService.describeArc(
        this.queryService.centerX,
        this.queryService.offsetCenterY,
        params.scaleRadius + (2 * params.ticksIndent) + params.ticksLength,
        params.startAngle,
        params.endAngle
      )
    );

    const texts = this.mathService.generateTexts(
      this.queryService.centerX,
      this.queryService.offsetCenterY,
      params.scaleRadius,
      params.startAngle,
      params.endAngle,
      params.ticksCount,
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

  private setCurrentAngle = (angle) => {
    this.currentAngle = angle;
  }
}

export default GaugeRenderService;

import * as constants from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import Point from '../structures/point';
import Segment from '../structures/segment';
import arrayUtil from '../utils/array-util';

class GaugeRenderer {
  constructor(private svgEl: SVGElement) {
  }

  public renderScale() {
    const segments = mathService.calculateSegments(
        constants.GAUGE_SCALE_START_ANGLE,
        constants.GAUGE_SCALE_END_ANGLE,
        constants.GAUGE_SCALE_RATIO
      );

    Array.from(this.gaugeScaleElements)
      .forEach((el, indx) => {
        el.setAttribute(
          'd', SVGService.generateArc(
            constants.GAUGE_SCALE_CENTER_X,
            constants.GAUGE_SCALE_CENTER_Y,
            constants.GAUGE_SCALE_RADIUS,
            segments[indx].start,
            segments[indx].end
          )
        );
      });
  }

  public renderAxis() {
    this.gaugeTextPathEl.setAttribute(
      'd', SVGService.generateArc(
        constants.GAUGE_SCALE_CENTER_X,
        constants.GAUGE_SCALE_CENTER_Y,
        (
          constants.GAUGE_SCALE_RADIUS +
          (2 * constants.GAUGE_TICKS_INDENT) +
          constants.GAUGE_TICKS_LENGTH
        ),
        constants.GAUGE_SCALE_START_ANGLE,
        constants.GAUGE_SCALE_END_ANGLE
      )
    );

    const axis = mathService.calculateAxis(
      constants.GAUGE_SCALE_CENTER_X,
      constants.GAUGE_SCALE_CENTER_Y,
      constants.GAUGE_SCALE_RADIUS,
      constants.GAUGE_SCALE_START_ANGLE,
      constants.GAUGE_SCALE_END_ANGLE,
      constants.GAUGE_TICKS_COUNT,
      this.gaugeScaleLength
    );

    Array.from(this.gaugeLinesElements)
      .forEach((el, i) => {
        const attr = el.setAttribute.bind(el),
          line = axis[i].line;

        attr('x1', line.p1.x);
        attr('y1', line.p1.y);
        attr('x2', line.p2.x);
        attr('y2', line.p2.y);
      }
    );

    Array.from(this.gaugeTextsElements)
      .forEach((el, i: number) => {
        const textPathEl = el.firstElementChild,
          text = axis[i].text;

        el.setAttribute('x', text.x);
        el.setAttribute('text-anchor', 'start');
        el.setAttribute('transform', `
          translate(${2 * text.p.x},0)
          scale(-1, 1)
          rotate(${text.degree} ${text.p.x} ${text.p.y})
        `);
        textPathEl.setAttribute('href', '#gauge-text-path');
        textPathEl.textContent = text.content;
      });
  }

  public renderHand() {
    this.gaugeHandEl.setAttribute('d', SVGService.describeHand());
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

  private get gaugeScaleElements(): HTMLCollection {
    if (!this.gaugeScaleGroupEl.hasChildNodes()) {
      this.gaugeScaleGroupEl.appendChild(
        this.createElement('path', constants.GAUGE_SCALE_PATH_COUNT)
      );
    }

    return this.gaugeScaleGroupEl.children;
  }

  private get gaugeLinesElements(): HTMLCollection {
    if (!this.gaugeLinesGroupEl.hasChildNodes()) {
      this.gaugeLinesGroupEl.appendChild(
        this.createElement('line', constants.GAUGE_TICKS_COUNT)
      );
    }

    return this.gaugeLinesGroupEl.children;
  }

  private get gaugeTextsElements(): HTMLCollection {
    if (!this.gaugeTextsGroupEl.hasChildNodes()) {
      this.gaugeTextsGroupEl.appendChild(
        this.createElement('text', constants.GAUGE_TICKS_TEXT_COUNT)
      );

      Array.from(this.gaugeTextsGroupEl.children)
        .forEach((el) => el.appendChild(this.createElement('textPath')));
    }

    return this.gaugeTextsGroupEl.children;
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

  private get gaugeHandEl(): SVGPathElement {
    return this.svgEl.querySelector('#gauge-hand') as SVGPathElement;
  }
}

export default GaugeRenderer;

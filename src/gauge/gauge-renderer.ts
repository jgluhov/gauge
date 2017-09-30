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

    Array.from(this.gaugeScaleElements).forEach((element, indx) => {
      element.setAttribute(
        'points', SVGService.generateArc(
          240, 115, 170, segments[indx].start, segments[indx].end
        )
      );
    });
  }

  public renderAxis() {
    const axis = mathService.calculateAxis(
      240, 115, 170,
      constants.GAUGE_SCALE_START_ANGLE,
      constants.GAUGE_SCALE_END_ANGLE,
      constants.GAUGE_LINES_COUNT
    );

    Array.from(this.gaugeAxisElements)
      .forEach((el) => {
        const attr = el.setAttribute.bind(el),
          axle = axis.shift(),
          p1 = axle.shift(),
          p2 = axle.shift();

        attr('x1', p1.x);
        attr('y1', p1.y);
        attr('x2', p2.x);
        attr('y2', p2.y);
      }
    );
  }

  private createElement = (tagName, count): DocumentFragment => {
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

  private get gaugeScaleGroupEl() {
    return this.svgEl.querySelector('#gauge-scale-group');
  }

  private get gaugeAxisGroupEl() {
    return this.svgEl.querySelector('#gauge-axis-group');
  }

  private get gaugeScaleElements() {
    if (!this.gaugeScaleGroupEl.hasChildNodes()) {
      this.gaugeScaleGroupEl.appendChild(
        this.createElement('polyline', constants.GAUGE_POLYLINES_COUNT)
      );
    }

    return this.gaugeScaleGroupEl.children;
  }

  private get gaugeAxisElements() {
    if (!this.gaugeAxisGroupEl.hasChildNodes()) {
      this.gaugeAxisGroupEl.appendChild(
        this.createElement('line', constants.GAUGE_LINES_COUNT)
      );
    }

    return this.gaugeAxisGroupEl.children;
  }
}

export default GaugeRenderer;

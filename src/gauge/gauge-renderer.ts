import * as constants from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import Segment from '../structures/segment';
import arrayUtil from '../utils/array-util';

class GaugeRenderer {
  private GAUGE_POLYLINES_COUNT = 3;

  constructor(private svgEl: SVGElement) {
  }

  public renderScale() {
    const segments = mathService.calculateSegments(
        constants.GAUGE_SCALE_START_ANGLE,
        constants.GAUGE_SCALE_END_ANGLE,
        constants.GAUGE_SCALE_RATIO
      );

    Array.prototype.forEach.call(
      this.gaugeScaleElements,
      (gaugeScaleElement, indx) => {
        gaugeScaleElement.setAttribute(
          'points', SVGService.generateArc(
            240, 115, 170, segments[indx].start, segments[indx].end
          )
        );
      });
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

  private get gaugeScaleElements() {
    if (!this.gaugeScaleGroupEl.hasChildNodes()) {
      this.gaugeScaleGroupEl.appendChild(
        this.createElement('polyline', this.GAUGE_POLYLINES_COUNT)
      );
    }

    return this.gaugeScaleGroupEl.children;
  }
}

export default GaugeRenderer;

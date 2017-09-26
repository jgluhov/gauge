import * as constants from '../constants';
import mathService from '../services/math-service';
import SVGService from '../services/svg-service';
import Segment from '../structures/segment';
import arrayUtil from '../utils/array-util';

class GaugeRenderer {
  constructor(private svgEl: SVGElement) {
  }

  public createPolylines = (): DocumentFragment => {
    const polyline = document.createElementNS(
      this.svgEl.getAttribute('xmlns'), 'polyline'
    ),
    fragment = document.createDocumentFragment();
    polyline.classList.add('gauge__scale');

    constants.GAUGE_SCALE_MODIFIERS.forEach(
      (modifier) => {
        const clone = (polyline.cloneNode(true) as SVGPolylineElement);
        clone.classList.add(modifier);
        fragment.appendChild(clone);
      });

    return fragment;
  }

  public renderScale() {
    const arcSegments = mathService.calculateArcSegments(
        constants.GAUGE_SCALE_START_ANGLE,
        constants.GAUGE_SCALE_END_ANGLE,
        constants.GAUGE_SCALE_RATIO
      );

    const parts = arrayUtil.zip(this.gaugeScaleElements, arcSegments);

    parts.forEach((part) => {
      const polylineEl = part.shift() as SVGPolylineElement,
        segment = part.shift() as Segment;

      polylineEl.setAttribute(
        'points', SVGService.generateArc(
          240, 115, 170, segment.startAngle, segment.endAngle
        )
      );
    });
  }

  private get gaugeScaleGroupEl() {
    return this.svgEl.querySelector('#gauge-scale-group');
  }

  private get gaugeScaleElements() {
    const elements = this.gaugeScaleGroupEl.getElementsByTagName('polyline');

    if (!arrayUtil.size(elements)) {
      this.gaugeScaleGroupEl.appendChild(this.createPolylines());
    }

    return [].slice.call(elements);
  }
}

export default GaugeRenderer;

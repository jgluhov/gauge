import * as constants from '../constants';
import Point from '../structures/point';
import mathService from './math-service';

class SVGService {
  public generateArc = (
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    startAngle: number = 0,
    endAngle: number = 0
  ): string => {
    const points = [],
      start = startAngle < endAngle ? startAngle : endAngle,
      end = startAngle < endAngle ? endAngle : startAngle;

    startAngle = mathService.normalizeAngle(startAngle);
    endAngle = mathService.normalizeAngle(endAngle);

    for (let angle = start; angle <= end; angle += constants.GAUGE_SCALE_DRAW_STEP) {
      const { x , y } = mathService.polarToCartesian(
        centerX, centerY, radius, angle
      );

      points.push([ x, ',', y].join(''));
    }

    return points.join(' ');
  }
}

export default new SVGService();

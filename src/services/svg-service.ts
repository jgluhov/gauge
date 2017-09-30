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
      const { x , y } = this.polarToCartesian(
        centerX, centerY, radius, angle
      );

      points.push([ x, ',', y].join(''));
    }

    return points.join(' ');
  }

  public polarToCartesian = (
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    angle: number = 0
  ): Point => {

    return new Point(
      centerX + mathService.multiply(radius * Math.cos(angle)),
      centerY + mathService.multiply(radius * Math.sin(angle))
    );
  }
}

export default new SVGService();

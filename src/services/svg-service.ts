import * as constants from '../constants';
import Point from '../structures/point';
import mathService from './math-service';

class SVGService {
  public describeArc = (
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    startAngle: number = 0,
    endAngle: number = 0
  ): string => {
    const start = this.polarToCartesian(centerX, centerY, radius, startAngle),
      end = this.polarToCartesian(centerX, centerY, radius, endAngle);

    const isGreaterOrEqual = mathService.isGreaterOrEqual(
        Math.PI, startAngle, endAngle
      );

    const largeArcFlag = Number(isGreaterOrEqual);

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
  }

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
      points.push([x, ',', y].join(''));
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

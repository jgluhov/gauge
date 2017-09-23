import { Point } from '../structures';
import mathService from './math-service';

class SVGService {
  public describeArc = (
    startX: number = 0,
    startY: number = 0,
    radius: number = 0,
    startAngle: number = 0,
    endAngle: number = 0
  ): string => {
    const start = this.polarToCartesian(startX, startY, radius, startAngle),
      end = this.polarToCartesian(startX, startY, radius, endAngle);

    const largeArcFlag = Number(Math.PI <= (endAngle - startAngle));

    const d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');

    return d;
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

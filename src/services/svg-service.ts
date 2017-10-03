import {
  DRAW_ACCURACY
} from '../constants';

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
    const centralAngle = mathService.calcCentralAngle(startAngle, endAngle),
      toCartesian = mathService.polarToCartesian.bind(mathService, centerX, centerY),
      pointsCount = Math.ceil(centralAngle / DRAW_ACCURACY);

    let angle = startAngle;

    return new Array(pointsCount)
      .fill(0)
      .reduce(
        (points: string[]) => {
          const point = toCartesian(radius, angle);
          angle += DRAW_ACCURACY;

          return [...points, [ `${point.x},${point.y}`]];
        },
        ['M']
      )
      .join(' ');
  }

  public describeHand = (
    centerX: number,
    centerY: number,
    scaleRadius: number,
    handRadius: number,
    ticksIndent: number,
    ticksLength: number
  ): string => {
    const point = mathService.polarToCartesian(
      centerX, centerY, scaleRadius + ticksIndent + ticksLength, Math.PI / 2
    );

    return `
      M${centerX - handRadius / 2} ${centerY}
      L${point.x}                  ${point.y},
      L${centerX + handRadius / 2} ${centerY}
      Z
    `;
  }
}

export default new SVGService();

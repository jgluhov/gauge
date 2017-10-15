import {
  DRAW_ACCURACY,
  SCALE_CENTER_X,
  SCALE_CENTER_Y
} from '../constants';

import Point from '../structures/point';
import MathService from './math.service';

class SVGService {
  public static describeRotation(rotateAngle: number): string {
    return `
      translate(${2 * SCALE_CENTER_X},0)
      scale(-1, 1)
      rotate(
        ${MathService.radiansToHandPosition(rotateAngle)}
        ${SCALE_CENTER_X} ${SCALE_CENTER_Y}
      )
    `;
  }

  private mathService: MathService;

  constructor() {
    this.mathService = new MathService();
  }

  public describeArc(
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    startAngle: number = 0,
    endAngle: number = 0
  ): string {
    const centralAngle = MathService.calcCentralAngle(startAngle, endAngle),
      toCartesian = this.mathService.polarToCartesian.bind(this.mathService, centerX, centerY),
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

  public describeHand(
    centerX: number,
    centerY: number,
    scaleRadius: number,
    handRadius: number,
    ticksIndent: number,
    ticksLength: number
  ): string {
    const point = this.mathService.polarToCartesian(
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

export default SVGService;

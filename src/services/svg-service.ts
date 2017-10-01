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
    const data = [],
      start = startAngle < endAngle ? startAngle : endAngle,
      end = startAngle < endAngle ? endAngle : startAngle;

    startAngle = mathService.normalizeAngle(startAngle);
    endAngle = mathService.normalizeAngle(endAngle);

    data.push('M');

    for (let angle = start; angle <= end; angle += constants.GAUGE_SCALE_DRAW_STEP) {
      const { x , y } = mathService.polarToCartesian(
        centerX, centerY, radius, angle
      );

      data.push([ x, ',', y].join(''));
    }

    return data.join(' ');
  }

  public describeHand = (): string => {
    const centerX = constants.GAUGE_SCALE_CENTER_X,
      centerY = constants.GAUGE_SCALE_CENTER_Y,
      handRadius = constants.GAUGE_HAND_RADIUS,
      scaleRadius = constants.GAUGE_SCALE_RADIUS,
      ticksIndent = constants.GAUGE_TICKS_INDENT,
      ticksLength = constants.GAUGE_TICKS_LENGTH,
      point = mathService.polarToCartesian(
        centerX, centerY,
        scaleRadius + ticksIndent + ticksLength,
        Math.PI / 2
      );

    return `
      M${centerX - handRadius} ${centerY}
      C${centerX - 20}         ${centerY - 22},
       ${centerX + 20}         ${centerY - 22},
       ${centerX + handRadius} ${centerY},
      L${point.x}              ${point.y},
      Z
    `;
  }
}

export default new SVGService();

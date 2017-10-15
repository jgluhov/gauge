import {
  DAMPING_EQ_A,
  DAMPING_EQ_B,
  DAMPING_EQ_C,
  TICKS_INDENT,
  TICKS_LENGTH,
  TICKS_POSITION_INDENT,
  TICKS_TEXT_INDENT
} from '../constants';

import Point from '../structures/point';
import Slice from '../structures/slice';
import Text from '../structures/text';
import Tick from '../structures/tick';

class MathService {
  public static multiplier(x: number): number {
    const parts = x.toString().split('.');

    if (parts.length < 2) {
      return 1;
    }

    return Math.pow(10, parts[1].length);
  }

  public static calcRatio(centralAngle: number = 0, ratio: number = 0): number {
    return centralAngle * ratio / 100;
  }

  public static calcStep(total: number = 0, count: number = 0): number {
    return total / (count - 1);
  }

  public static calcCentralAngle(startAngle: number, endAngle: number): number {
    return startAngle < endAngle ?
      (endAngle - startAngle) : (startAngle - endAngle);
  }

  public static radiansToDegree(radians: number): number {
    return (radians / Math.PI) * 180;
  }

  public static damping(time: number): number {
    return DAMPING_EQ_A *
      (Math.sin( DAMPING_EQ_B * time ) * Math.exp( -DAMPING_EQ_C * time ));
  }

  public static radiansToHandPosition(radians: number): number {
    return MathService.radiansToDegree(-1 * (radians - (Math.PI / 2)));
  }

  public multiply(...numbers): number {
    const formattedNumbers = numbers.map(this.formatNumber),
      factor = this.correctionFactor(formattedNumbers);

    return formattedNumbers.map(this.formatNumber)
      .reduce((x, y) => {
        return (x * factor) * (y * factor) / (factor * factor);
      }, 1);
  }

  public correctionFactor(...numbers): number {
    return numbers.reduce((prev: number, next: number) => {
      const mp = MathService.multiplier(prev),
          mn = MathService.multiplier(next);

      return Math.max(mp, mn);
    }, 1);
  }

  public isEpsilon = (n: number = 0): boolean => Math.abs(n) < 1e-10;

  public formatNumber = (n: number = 0): number => this.isEpsilon(n) ? 0 : n;

  public generateSlices(startAngle, endAngle, scaleRatio): Iterator<Slice> {

    const centralAngle = MathService.calcCentralAngle(startAngle, endAngle),
      calcRatio = MathService.calcRatio.bind(this, centralAngle);

    function* slices() {
      let i = 0,
        prevRatio = 0;

      while (i < scaleRatio.length) {
        const segment = calcRatio(scaleRatio[i]) - (calcRatio(prevRatio)),
          slice = new Slice(startAngle, startAngle + segment);

        yield slice;

        startAngle = slice.endAngle;
        prevRatio = scaleRatio[i];
        i++;
      }
    }

    return slices();
  }

  public generateTicks(
      centerX: number,
      centerY: number,
      startAngle: number,
      endAngle: number,
      radius: number,
      ticksCount: number
  ): Iterator<Tick> {
    const toCartesian = this.polarToCartesian.bind(this, centerX, centerY),
      centralAngle = MathService.calcCentralAngle(startAngle, endAngle),
      stepAngle = MathService.calcStep(centralAngle, ticksCount);

    function* ticks() {
      let i = 0,
        angle = startAngle;

      while (i < ticksCount) {
        yield new Tick(
          toCartesian(radius, angle),
          toCartesian(radius + TICKS_LENGTH, angle)
        );

        angle += stepAngle;
        i++;
      }
    }

    return ticks();
  }

  public generateTexts(
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    ticksCount: number,
    totalLength: number
  ) {
    const centralAngle = MathService.calcCentralAngle(startAngle, endAngle),
      stepAngle = MathService.calcStep(centralAngle, ticksCount),
      stepPosition = MathService.calcStep(totalLength, ticksCount),
      toCartesian = this.polarToCartesian.bind(this, centerX, centerY),
      toDegree = MathService.radiansToDegree.bind(this),
      textsRadius = radius + (2 * TICKS_INDENT) + TICKS_LENGTH;

    function* texts() {
      let i = 0,
        prevPosition = totalLength,
        prevAngle = endAngle;

      while (i < ticksCount) {
        yield new Text(
          Math.min(
            totalLength - 5,
            Math.max(prevPosition - TICKS_POSITION_INDENT, 5)
          ),
          i.toString(),
          toCartesian(textsRadius + TICKS_TEXT_INDENT, prevAngle),
          toDegree(Math.PI / 2 - prevAngle)
        );

        prevAngle -=  stepAngle;
        prevPosition -= stepPosition;
        i++;
      }
    }

    return texts();
  }

  public polarToCartesian(
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    angle: number = 0
  ): Point {

    return new Point(
      centerX + this.multiply(radius * Math.cos(angle)),
      centerY + this.multiply(radius * Math.sin(angle))
    );
  }
}

export default MathService;

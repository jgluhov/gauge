import {
  TICKS_LENGTH
} from '../constants';
import Axle from '../structures/axle';
import Point from '../structures/point';
import Slice from '../structures/slice';
import SVGText from '../structures/svg-text';
import Tick from '../structures/tick';
import utilService from '../utils/array-util';

class MathService {
  public multiply(...numbers): number {
    const formattedNumbers = numbers.map(this.formatNumber),
      factor = this.correctionFactor(formattedNumbers);

    return formattedNumbers.map(this.formatNumber)
      .reduce((x, y) => {
        return (x * factor) * (y * factor) / (factor * factor);
      }, 1);
  }

  public correctionFactor = (...numbers): number => {
    return numbers.reduce((prev: number, next: number) => {
      const mp = this.multiplier(prev),
          mn = this.multiplier(next);

      return Math.max(mp, mn);
    }, 1);
  }

  public multiplier = (x: number): number => {
    const parts = x.toString().split('.');

    if (parts.length < 2) {
      return 1;
    }

    return Math.pow(10, parts[1].length);
  }

  public isEpsilon = (n: number = 0): boolean => Math.abs(n) < 1e-10;

  public formatNumber = (n: number = 0): number => this.isEpsilon(n) ? 0 : n;

  public normalizeAngle = (angle) => angle % (2 * Math.PI);

  public calcSlices = (startAngle, endAngle, scaleRatio) => {

    const centralAngle = this.calcCentralAngle(startAngle, endAngle),
      calcRatio = this.calcRatio.bind(this, centralAngle);

    let prevRatio = 0;

    return scaleRatio.reduce(
      (slices: Slice[], ratio: number) => {
        const segment = calcRatio(ratio) - (calcRatio(prevRatio)),
          slice = new Slice(startAngle, startAngle + segment);

        startAngle = slice.endAngle;
        prevRatio = ratio;

        return [...slices, slice];
      }, []);
  }

  public generateTicks = (
    centerX: number,
    centerY: number,
    startAngle: number,
    endAngle: number,
    radius: number,
    ticksCount: number
  ) => {
    const toCartesian = this.polarToCartesian.bind(this, centerX, centerY),
      centralAngle = this.calcCentralAngle(startAngle, endAngle),
      step = this.calcStep(centralAngle, ticksCount);

    let angle = startAngle;

    return new Array(ticksCount)
      .fill(0)
      .reduce((ticks: ITick[]) => {
        ticks.push(
          new Tick(
            toCartesian(radius, angle),
            toCartesian(radius + TICKS_LENGTH, angle)
          )
        );

        angle += step;

        return ticks;
      }, []);
  }

  public calcAxis = (
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    startAngle: number = 0,
    endAngle: number = 0,
    count: number = 0,
    totalLength: number = 0
  ) => {
    // const centralAngle = this.calcCentralAngle(startAngle, endAngle),
    //   stepAngle = this.calcStep(centralAngle, count),
    //   stepLength = this.calcStep(totalLength, count),
    //   sign = Math.sign(endAngle - startAngle),
    //   toCartesian = this.polarToCartesian.bind(this, centerX, centerY),
    //   indentedRadiusForTexts = radius + (2 * constants.GAUGE_TICKS_INDENT) +
    //     constants.GAUGE_TICKS_LENGTH;
    //
    // let position = sign ? totalLength : 0,
    //   textStartAngle = endAngle;
    //
    // return new Array(count)
    //   .fill(0)
    //   .reduce((axis: IAxis, item, i: number) => {
    //     const axle = new Axle(
    //       new SVGLine(
    //         toCartesian(indentedRadiusForLines, startAngle),
    //         toCartesian(
    //           indentedRadiusForLines + constants.GAUGE_TICKS_LENGTH, startAngle
    //         )
    //       ),
    //       new SVGText(
    //         position,
    //         i.toString(),
    //         toCartesian(indentedRadiusForTexts + 6, stepAngle),
    //         this.radiansToDegree(Math.PI / 2 + (sign * startAngle))
    //       )
    //     );
    //
    //     startAngle += sign * stepAngle;
    //     position -= stepLength;
    //     textStartAngle -= stepAngle;
    //
    //     return [...axis, axle];
    //   }, []);
  }

  public calcRatio = (centralAngle: number = 0, ratio: number = 0): number => {
    return centralAngle * ratio / 100;
  }

  public calcStep = (total: number = 0, count: number = 0): number => {
    return total / (count - 1);
  }

  public calcCentralAngle = (start: number = 0, end: number = 0): number => {
    const s = this.normalizeAngle(start),
      e = this.normalizeAngle(end);

    return s < e ? (e - s) : (s - e);
  }

  public radiansToDegree = (radians: number): number => {
    return (radians / Math.PI) * 180;
  }

  public polarToCartesian = (
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    angle: number = 0
  ): Point => {

    return new Point(
      centerX + this.multiply(radius * Math.cos(angle)),
      centerY + this.multiply(radius * Math.sin(angle))
    );
  }

  public radiansToHandPosition = (radians: number): number => {
    return this.radiansToDegree(-1 * (radians - (Math.PI / 2)));
  }
}

export default new MathService();

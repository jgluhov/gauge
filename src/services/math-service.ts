import * as constants from '../constants';
import Axle from '../structures/axle';
import Point from '../structures/point';
import Segment from '../structures/segment';
import SVGLine from '../structures/svg-line';
import SVGText from '../structures/svg-text';
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

  public calculateSegments = (
    start: number = 0,
    end: number = 0,
    ratio: number[]
  ): Segment[] => {
    const interval = this.calcCentralAngle(start, end),
      calcRatio = this.calcRatio.bind(this, interval),
      sign = Math.sign(end - start);

    return ratio.reduce(
      (segments, percent: number, indx: number, array: number[]) => {
        const step = calcRatio(array[indx]) - (calcRatio(array[indx - 1])),
          segment = new Segment(start, start + (sign * step));

        start = segment.end;
        return [...segments, segment];
      }, []);
  }

  public calculateAxis = (
    centerX: number = 0,
    centerY: number = 0,
    radius: number = 0,
    startAngle: number = 0,
    endAngle: number = 0,
    count: number = 0,
    totalLength: number = 0
  ) => {
    const centralAngle = this.calcCentralAngle(startAngle, endAngle),
      stepAngle = this.calcStep(centralAngle, count),
      stepLength = this.calcStep(totalLength, count),
      sign = Math.sign(endAngle - startAngle),
      toCartesian = this.polarToCartesian.bind(this, centerX, centerY),
      indentedRadiusForLines = radius + constants.GAUGE_LINES_INDENT,
      indentedRadiusForTexts = radius + (2 * constants.GAUGE_LINES_INDENT) +
        constants.GAUGE_LINES_LENGTH;

    let startLength = sign ? totalLength : 0;

    return new Array(count)
      .fill(0)
      .reduce((axis: IAxis, item, i: number) => {
        const axle = new Axle(
          new SVGLine(
            toCartesian(indentedRadiusForLines, startAngle),
            toCartesian(
              indentedRadiusForLines + constants.GAUGE_LINES_LENGTH, startAngle
            )
          ),
          new SVGText(
            Math.max(0, startLength + sign * 5),
            i.toString(),
            toCartesian(indentedRadiusForTexts + 6, startAngle),
            this.radiansToDegree(Math.PI / 2 + (sign * startAngle))
          )
        );

        startAngle += sign * stepAngle;
        startLength += sign * stepLength;

        return [...axis, axle];
      }, []);
  }

  public calcRatio = (total: number = 0, percent: number = 0): number => {
    return total * percent / 100;
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
}

export default new MathService();

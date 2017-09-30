import Point from '../structures/point';
import Segment from '../structures/segment';
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
    const interval = this.calculateInterval(start, end),
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
    indent: number = 8,
    length: number = 3
  ) => {
    const interval = this.calculateInterval(startAngle, endAngle),
      step = interval / (count - 1),
      sign = Math.sign(endAngle - startAngle);

    return new Array(count)
      .fill(0)
      .reduce((lines: Point[][]) => {
        const line = [
          this.polarToCartesian(centerX, centerY, radius + indent, startAngle),
          this.polarToCartesian(centerX, centerY, radius + indent + length, startAngle)
        ];

        startAngle += sign * step;

        return [...lines, line];
      }, []);
  }

  public calcRatio = (total: number = 0, percent: number = 0): number => {
    return total * percent / 100;
  }

  public calculateInterval = (start: number = 0, end: number = 0): number => {
    const s = this.normalizeAngle(start),
      e = this.normalizeAngle(end);

    return s < e ? (e - s) : (s - e);
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

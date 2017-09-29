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

  public multiplier = (x: number): number => {
    const parts = x.toString().split('.');

    if (parts.length < 2) {
      return 1;
    }

    return Math.pow(10, parts[1].length);
  }

  public correctionFactor = (...numbers): number => {
    return numbers.reduce((prev: number, next: number) => {
      const mp = this.multiplier(prev),
          mn = this.multiplier(next);

      return Math.max(mp, mn);
    }, 1);
  }

  public isEpsilon = (n: number = 0): boolean => {
    return Math.abs(n) < 1e-10;
  }

  public formatNumber = (n: number = 0): number => {
    return this.isEpsilon(n) ? 0 : n;
  }

  public isGreaterOrEqual = (
    comparator: number = 0,
    startAngle: number = 0,
    endAngle: number = 0
  ): boolean => {
    return (Math.PI <= (Math.abs(endAngle - startAngle)));
  }

  public normalizeAngle = (angle) => angle % (2 * Math.PI);

  public calculateSegments = (
    startAngle: number = 0,
    endAngle: number = 0,
    ratio: number[]
  ) => {
    const interval = this.calculateInterval(startAngle, endAngle),
      calcStep = this.calculateStep.bind(this, interval),
      sign = Math.sign(endAngle - startAngle);

    let start = startAngle;

    return ratio.reduce(
      (segments: Segment[], percent: number, indx: number, array: number[]) => {
        const step = calcStep(array[indx]) - (calcStep(array[indx - 1]));
        const segment = new Segment(start, start + (sign * step));

        start = segment.end;
        return [...segments, segment];
      }, []);
  }

  public calculateStep = (
    total: number = 0,
    percent: number = 0
  ): number => {
    return total * percent / 100;
  }

  public calculateInterval = (
    startAngle: number = 0,
    endAngle: number = 0
  ): number => {
    const start = this.normalizeAngle(startAngle),
      end = this.normalizeAngle(endAngle);

    return start < end ? end - start : start - end;
  }

  /**
   * TODO: need to realize converting from
   * scientific format of number to decimal one
   * like this https://gist.github.com/jiggzson/b5f489af9ad931e3d186
   */
}

export default new MathService();

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
  ) => {
    const interval = this.calculateInterval(start, end),
      calcStep = this.calcStep.bind(this, interval),
      sign = Math.sign(end - start);

    return ratio.reduce(
      (segments, percent: number, indx: number, array: number[]) => {
        const step = calcStep(array[indx]) - (calcStep(array[indx - 1])),
          segment = new Segment(start, start + (sign * step));

        start = segment.end;
        return [...segments, segment];
      }, []);
  }

  public calcStep = (total: number = 0, percent: number = 0): number => {
    return total * percent / 100;
  }

  public calculateInterval = (start: number = 0, end: number = 0): number => {
    const s = this.normalizeAngle(start),
      e = this.normalizeAngle(end);

    return s < e ? (e - s) : (s - e);
  }
}

export default new MathService();

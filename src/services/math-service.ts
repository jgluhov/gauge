import Endpoint from '../structures/endpoint';

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
    const totalAngle = Math.abs(startAngle) + Math.abs(endAngle);

    return ratio.reduce(
      (endpoints: Endpoint[], percent, index: number) => {
      const prevEndpoint = endpoints.slice().pop(),
        prevAngle = prevEndpoint ? prevEndpoint.endAngle : startAngle,
        stepAngle = (totalAngle * (percent / 100));

      return [
        ...endpoints,
        new Endpoint(prevAngle, prevAngle + stepAngle)
      ];
    }, []);
  }

  /**
   * TODO: need to realize converting from
   * scientific format of number to decimal one
   * like this https://gist.github.com/jiggzson/b5f489af9ad931e3d186
   */
}

export default new MathService();

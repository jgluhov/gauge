import {
  TICKS_INDENT,
  TICKS_LENGTH,
  TICKS_POSITION_INDENT,
  TICKS_TEXT_INDENT
} from '../constants';
import Point from '../structures/point';
import Slice from '../structures/slice';
import Text from '../structures/text';
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

  public generateSlices = (startAngle, endAngle, scaleRatio) => {

    const centralAngle = this.calcCentralAngle(startAngle, endAngle),
      calcRatio = this.calcRatio.bind(this, centralAngle);

    let prevRatio = 0;

    return scaleRatio.reduce(
      (slices: ISlice[], ratio: number) => {
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

  public generateTexts = (
    centerX: number,
    centerY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    ticksCount: number,
    totalLength: number
  ) => {
    const centralAngle = this.calcCentralAngle(startAngle, endAngle),
      stepAngle = this.calcStep(centralAngle, ticksCount),
      stepPosition = this.calcStep(totalLength, ticksCount),
      toCartesian = this.polarToCartesian.bind(this, centerX, centerY),
      textsRadius = radius + (2 * TICKS_INDENT) + TICKS_LENGTH;

    let prevPosition = totalLength,
      prevAngle = endAngle;

    return new Array(ticksCount)
      .fill(0)
      .reduce(
        (texts: IText[], item, i: number) => {
          const text = new Text(
            Math.min(
              totalLength - 5,
              Math.max(prevPosition - TICKS_POSITION_INDENT, 5)
            ),
            i.toString(),
            toCartesian(textsRadius + TICKS_TEXT_INDENT, prevAngle),
            this.radiansToDegree(Math.PI / 2 - prevAngle)
          );

          prevAngle -=  stepAngle;
          prevPosition -= stepPosition;

          return [...texts, text];
        },
        []
      );
  }

  public calcRatio = (centralAngle: number = 0, ratio: number = 0): number => {
    return centralAngle * ratio / 100;
  }

  public calcStep = (total: number = 0, count: number = 0): number => {
    return total / (count - 1);
  }

  public calcCentralAngle = (startAngle: number, endAngle: number): number => {
    return startAngle < endAngle ?
      (endAngle - startAngle) : (startAngle - endAngle);
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

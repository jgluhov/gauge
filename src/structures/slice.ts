export interface ISlice {
  startAngle: number;
  endAngle: number;
  centralAngle: () => number;
}

export default class Slice implements ISlice {
  constructor(
    public startAngle: number = 0,
    public endAngle: number = 0
  ) {}

  public centralAngle() {
    return Math.abs(this.endAngle - this.startAngle);
  }
}

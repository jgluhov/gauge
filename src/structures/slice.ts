export default class Slice implements ISlice {
  constructor(
    public startAngle: number = 0,
    public endAngle: number = 0
  ) {}

  public segment() {
    return Math.abs(this.startAngle - this.endAngle);
  }

  public direction() {
    return this.startAngle > this.endAngle ? -1 : 1;
  }

  public empty() {
    return +!(this.startAngle - this.endAngle === 0);
  }
}

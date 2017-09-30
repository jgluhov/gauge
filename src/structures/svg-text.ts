export default class SVGText implements ISVGText {
  constructor(
    public x: number,
    public content: string,
    public p: IPoint,
    public degree: number
  ) {
  }
}

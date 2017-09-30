declare const fixture;

declare module '*.html' {
    const content: any;
    export default content;
}

declare module '*.css' {
    const content: any;
    export = content;
}

interface IPoint {
  x: number;
  y: number;
}

interface ISVGLine {
  p1: IPoint;
  p2: IPoint;
}

interface ISVGText {
  p: IPoint;
  text: string;
}

interface IAxle {
  line: ISVGLine;
  text: ISVGText;
}

type IAxis = IAxle[];

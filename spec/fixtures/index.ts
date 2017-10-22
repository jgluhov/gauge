export interface IFixture {
  load: (templateUrl: string) => string[];
  el: HTMLElement;
}

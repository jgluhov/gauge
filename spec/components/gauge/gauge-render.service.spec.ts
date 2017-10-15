import GaugeRenderService from '../../../src/components/gauge/gauge-render.service';

declare const fixture;

describe('Gauge Render Service', () => {
  beforeEach(() => {
    fixture.load('gauge.fixture.html');

    this.svgEl = fixture.el.firstChild.svgEl;
    this.renderService = new GaugeRenderService(this.svgEl);
  });

  it('should have svg element property', () => {
    expect(this.renderService.queryService.svgEl).toBeDefined();
  });
});

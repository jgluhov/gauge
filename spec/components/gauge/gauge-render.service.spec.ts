import GaugeRenderService from '../../../src/components/gauge/gauge-render.service';

declare const fixture;

describe('Gauge Render Service', () => {
  beforeEach(() => {
    fixture.load('gauge.fixture.html');

    this.svgEl = fixture.el.firstChild.svgEl;
    this.service = new GaugeRenderService(this.svgEl);
  });

  it('should have svg element property', () => {
    expect(this.service.queryService.svgEl).toBeDefined();
  });
});

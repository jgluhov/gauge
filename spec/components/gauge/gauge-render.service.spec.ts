import GaugeRenderService from '../../../src/components/gauge/gauge-render.service';

declare const fixture;

describe('Gauge Render Service', () => {
  beforeEach(() => {
    fixture.load('gauge.fixture.html');
    this.gaugeEl = fixture.el.firstChild;

    this.svgEl = this.gaugeEl.svgEl;
    this.service = new GaugeRenderService(this.svgEl, this.gaugeEl.defaultParams);
  });

  it('should have svg element property', () => {
    expect(this.service.queryService.svgEl).toBeDefined();
  });
});

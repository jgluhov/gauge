import Gauge from '../../src/gauge/gauge';
import GaugeRenderer from '../../src/gauge/gauge-renderer';

describe('Gauge Renderer', () => {
  beforeEach(() => {
    fixture.load('gauge.fixture.html');
    this.svgEl = fixture.el.firstChild.svgEl;
    this.renderer = new GaugeRenderer(this.svgEl);
  });

  it('should have svg element property', () => {
    expect(this.renderer.svgEl).toBeDefined();
  });
});

import Gauge from '../../src/gauge';
import Renderer from '../../src/gauge/renderer';

describe('Gauge Renderer', () => {
  beforeEach(() => {
    fixture.load('gauge.fixture.html');
    this.svgEl = fixture.el.firstChild.svgEl;
    this.renderer = new Renderer(this.svgEl);
  });

  it('should have svg element property', () => {
    expect(this.renderer.elements.svgEl).toBeDefined();
  });
});

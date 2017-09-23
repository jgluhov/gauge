import Gauge from '../src/gauge/gauge';

declare const fixture;

describe('Gauge', () => {
  beforeAll(() => {
    window.customElements.define('app-gauge', Gauge);
  });

  beforeEach(() => {
    fixture.load('gauge.fixture.html');
    this.gaugeEl = fixture.el.firstChild;
    this.gaugeScaleEl = this.gaugeEl.shadowRoot.querySelector('.gauge__scale');
  });

  describe('Observe Attributes', () => {
    it('should observeAttributes be defined', () => {
      expect(Gauge.observedAttributes).toBeDefined();
    });

    describe('when read observeAttributes property', () => {
      it('should return array', () => {
        expect(Gauge.observedAttributes).toEqual(jasmine.any(Array));
      });
    });
  });

  describe('Shadow DOM', () => {
    describe('when Gauges constructor is called', () => {
      it('should create shadow dom', () => {
        expect(this.gaugeEl.shadowRoot).not.toBeNull();
      });
    });
  });

  describe('SVG', () => {
    it('should have svg element property', () => {
      expect(this.gaugeEl.svgEl).toBeDefined();
    });

    describe('#createShadowRoot()', () => {
      describe('when its called', () => {
        it('should return SVGElement', () => {
          expect(this.gaugeEl.createShadowRoot())
            .toEqual(jasmine.any(Node));
        });
      });
    });

    describe('#render()', () => {
      describe('when called', () => {
        beforeEach(() => {
          this.gaugeEl.render();
          this.gaugeScalePath = this.gaugeScaleEl.getAttribute('d');
        })
        it('should draw scale path', () => {
          expect(this.gaugeScalePath).not.toBe('');
        });
      });
    });
  });
});

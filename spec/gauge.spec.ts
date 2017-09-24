import Gauge from '../src/gauge/gauge';

declare const fixture;

describe('Gauge', () => {
  beforeAll(() => {
    window.customElements.define('app-gauge', Gauge);
  });

  beforeEach(() => {
    fixture.load('gauge.fixture.html');
    this.gaugeEl = fixture.el.firstChild;
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

  xdescribe('getter gaugeScaleEl', () => {
    describe('when read gaugeScaleEl property', () => {
      it('should return element', () => {
        expect(this.gaugeEl.gaugeScaleEl)
          .toEqual(jasmine.any(Element));
      });

      it('should return element with correct id', () => {
        expect(this.gaugeEl.gaugeScaleEl.id)
          .toBe('gauge-scale');
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

    xdescribe('#render()', () => {
      describe('when called', () => {
        beforeEach(() => {
          this.gaugeEl.render();
        });

        it('should draw scale path', () => {
          expect(this.gaugeEl.gaugeScaleEl.getAttribute('d')).not.toBe('');
        });
      });
    });
  });
});

import Gauge from '../src/gauge';

declare const fixture;

describe('Gauge', () => {
  beforeAll(() => {
    window.customElements.define('app-gauge', Gauge);
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
    beforeEach(() => {
      fixture.load('gauge.fixture.html');
      this.gaugeEl = fixture.el.firstChild;
    });

    describe('when Gauges constructor is called', () => {

      it('should create shadow dom', () => {
        expect(this.gaugeEl.shadowRoot).not.toBeNull();
      });

      it('should contain svg element', () => {
        expect(this.gaugeEl.shadowRoot.contains(this.gaugeEl.el))
          .toBeTruthy();
      });

    });
  });

  describe('SVG', () => {

    it('should have svg element property', () => {
      expect(this.gaugeEl.el).toBeDefined();
    });

    describe('#createSVGElement()', () => {
      describe('when its called', () => {

        it('should return SVGElement', () => {
          expect(this.gaugeEl.createSVGElement())
            .toEqual(jasmine.any(Node));
        });

      });
    });
  });
});

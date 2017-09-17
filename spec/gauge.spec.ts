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

    });

  });

});

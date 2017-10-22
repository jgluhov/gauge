import Gauge from '../../../src/components/gauge/gauge.component';
import { IFixture } from '../../fixtures';

declare const fixture: IFixture;

describe('Gauge Web Component', () => {
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

  describe('Gauge shadow DOM', () => {
    describe('when Gauges constructor is called', () => {
      it('should create shadow dom', () => {
        expect(this.gaugeEl.shadowRoot).not.toBeNull();
      });
    });
  });
});

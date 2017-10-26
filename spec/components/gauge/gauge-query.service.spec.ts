import { sandbox } from 'sinon';
import QueryService from '../../../src/components/gauge/gauge-query.service';

declare const fixture;

describe('GaugeQueryService: Tests', () => {
  beforeEach(() => {
    fixture.load('gauge.fixture.html');

    this.gaugeEl = fixture.el.firstChild;
    this.svgEl = this.gaugeEl.svgEl;
    this.svgEl.name = 'hello';
    this.service = new QueryService(this.svgEl, this.gaugeEl.defaultParams);

    this.sandbox = sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#centerX()', () => {
    beforeEach(() => {
      this.sandbox.stub(this.service.svgEl, 'clientWidth').get(() => 100);
    });

    describe('when read center x property', () => {
      it('should return number', () => {
        expect(this.service.centerX).toEqual(jasmine.any(Number));
      });

      it('should return correct number', () => {
        expect(this.service.centerX).toEqual(50);
      });
    });
  });

  describe('#centerY()', () => {
    beforeEach(() => {
      this.sandbox.stub(this.service.svgEl, 'clientHeight').get(() => 50);
    });

    describe('when read center y property', () => {
      it('should return number', () => {
        expect(this.service.centerY).toEqual(jasmine.any(Number));
      });

      it('should return correct number', () => {
        expect(this.service.centerY).toEqual(25);
      });
    });
  });
});

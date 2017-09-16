import Gauge from '../src/gauge';

describe('Gauge', () => {

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

});

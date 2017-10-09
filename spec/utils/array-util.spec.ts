import arrayUtil from '../../src/utils/array-util';

describe('Array Service', () => {
  describe('#size()', () => {
    describe('when called without params', () => {
      it('should return zero', () => {
        expect(arrayUtil.size()).toEqual(0);
      });
    });

    describe('when called with params', () => {
      it('should return zero', () => {
        expect(arrayUtil.size([1, 2, 3]))
          .toEqual(3);
      });
    });
  });
});

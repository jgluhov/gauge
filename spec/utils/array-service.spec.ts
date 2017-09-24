import arrayUtil from '../../src/utils/array-util';

describe('Array Service', () => {
  describe('#zip()', () => {
    describe('when called without params', () => {
      it('should return empty array', () => {
        expect(arrayUtil.zip()).toEqual([]);
      });
    });

    describe('when called with single single array', () => {
      beforeEach(() => {
        this.firstArray = [1, 2];
        this.secondArray = [1, 2, 3];
      });

      it('should return correct zipped array', () => {
        expect(arrayUtil.zip(this.firstArray))
          .toEqual([[1], [2]]);
      });
    });

    describe('when called with multiple arrays', () => {
      beforeEach(() => {
        this.firstArray = [1, 2];
        this.secondArray = [1, 2, 3];
      });

      it('should return correct zipped array', () => {
        expect(arrayUtil.zip(this.firstArray, this.secondArray))
          .toEqual([[1, 1], [2, 2]]);
      });
    });
  });

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

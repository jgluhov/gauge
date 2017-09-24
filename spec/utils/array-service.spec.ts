import arrayService from '../../src/utils/array-service';

describe('Array Service', () => {
  describe('#zip()', () => {
    describe('when called without params', () => {
      it('should return empty array', () => {
        expect(arrayService.zip()).toEqual([]);
      });
    });

    describe('when called with single single array', () => {
      beforeEach(() => {
        this.firstArray = [1, 2];
        this.secondArray = [1, 2, 3];
      });

      it('should return correct zipped array', () => {
        expect(arrayService.zip(this.firstArray))
          .toEqual([[1], [2]]);
      });
    });

    describe('when called with multiple arrays', () => {
      beforeEach(() => {
        this.firstArray = [1, 2];
        this.secondArray = [1, 2, 3];
      });

      it('should return correct zipped array', () => {
        expect(arrayService.zip(this.firstArray, this.secondArray))
          .toEqual([[1, 1], [2, 2]]);
      });
    });
  });
});

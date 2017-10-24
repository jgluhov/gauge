import DOMService from '../../src/services/dom.service';
import { IFixture } from '../fixtures';
import { createAttr } from '../helpers';

declare const fixture: IFixture;

describe('DOMService: Tests', () => {

  describe('#createShadowRoot()', () => {
    describe('when its called', () => {
      it('should return SVGElement', () => {
        expect(DOMService.createShadowRoot(
          '<style></style>',
          '<div></div>')
        ).toEqual(jasmine.any(Node));
      });
    });
  });

  describe('#toParams()', () => {
    beforeEach(() => {
      this.el = document.createElement('div');
      this.attributes = this.el.cloneNode().attributes;
    });

    describe('when one pass empty attributes', () => {
      describe('without default params', () => {
        it('should return empty object', () => {
          expect(DOMService.toParams(this.attributes))
            .toEqual({});
        });
      });

      describe('with default params', () => {
        it('should return default object', () => {
          const defaultParams = {
            some: 5
          };

          expect(DOMService.toParams(this.attributes, defaultParams))
            .toEqual(defaultParams);
        });
      });
    });

    describe('when one pass attrs with class element', () => {
      beforeEach(() => {
        this.attributes.setNamedItem(createAttr('class', 'some'));
      });

      describe('without default params', () => {
        it('should return empty object', () => {
          expect(DOMService.toParams(this.attributes))
            .toEqual({});
        });
      });

      describe('with default params', () => {
        it('should return default object', () => {
          const defaultParams = {
            some: 5
          };

          expect(DOMService.toParams(this.attributes, defaultParams))
            .toEqual(defaultParams);
        });
      });
    });

    describe('when we pass non empty attributes', () => {
      beforeEach(() => {
        this.attributes.setNamedItem(createAttr('start-angle', '50'));
      });

      describe('with class element', () => {
        beforeEach(() => {
          this.attributes.setNamedItem(createAttr('class', 'some'));
        });

        describe('without default params', () => {
          it('should return correct params object', () => {
            expect(DOMService.toParams(this.attributes)).toEqual({
              startAngle: 50
            });
          });
        });

        describe('with default params', () => {
          it('should return correct params object', () => {
            const defaultParams = {
              some: 5
            };

            expect(DOMService.toParams(this.attributes, defaultParams))
              .toEqual({
                some: 5,
                startAngle: 50
              });
          });
        });
      });

      describe('without class element', () => {
        describe('without default params', () => {
          it('should return correct params object', () => {
            expect(DOMService.toParams(this.attributes)).toEqual({
              startAngle: 50
            });
          });
        });

        describe('with default params', () => {
          it('should return correct params object', () => {
            const defaultParams = {
              some: 5
            };

            expect(DOMService.toParams(this.attributes, defaultParams))
              .toEqual({
                some: 5,
                startAngle: 50
              });
          });
        });
      });
    });

    describe('when we pass wrong attributes', () => {
      beforeEach(() => {
        this.attributes.setNamedItem(createAttr('class', ''));
      });

      describe('with class element', () => {
        beforeEach(() => {
          this.attributes.setNamedItem(createAttr('class', 'some'));
        });

        describe('with default params', () => {
          it('should return default params', () => {
            const defaultParams = {
              some: 5
            };

            expect(DOMService.toParams(this.attributes, defaultParams))
              .toEqual(defaultParams);
          });
        });

        describe('without default params', () => {
          it('should return empty object', () => {
            expect(DOMService.toParams(this.attributes))
              .toEqual({});
          });
        });
      });

      describe('without class element', () => {
        describe('with default params', () => {
          it('should return default params', () => {
            const defaultParams = {
              some: 5
            };

            expect(DOMService.toParams(this.attributes, defaultParams))
              .toEqual(defaultParams);
          });
        });

        describe('without default params', () => {
          it('should return empty object', () => {
            expect(DOMService.toParams(this.attributes))
              .toEqual({});
          });
        });
      });
    });
  });

  describe('#hyphenToCamelCase()', () => {
    describe('when pass empty attr name', () => {
      it('should return empty string', () => {
        expect(DOMService.hyphenToCamelCase(''))
          .toEqual('');
      });
    });

    describe('when pass incorrect attr name', () => {
      it('should return empty string', () => {
        expect(DOMService.hyphenToCamelCase('?some-name'))
          .toEqual('someName');
      });
    });

    describe('when pass attr name without hyphen', () => {
      it('should return attr name', () => {
        expect(DOMService.hyphenToCamelCase('value'))
          .toEqual('value');
      });
    });

    describe('when pass attr name with hyphen', () => {
      it('should return camelCased name', () => {
        expect(DOMService.hyphenToCamelCase('some-value'))
          .toEqual('someValue');
      });
    });
  });

  describe('#parseAttr()', () => {
    describe('when passed empty string', () => {
      it('should return undefined', () => {
        expect(DOMService.parseAttr('')).toBeUndefined();
      });
    });

    describe('when passed incorrect string', () => {
      it('should return undefined', () => {
        expect(DOMService.parseAttr('?$@?@!$%^')).toBeUndefined();
      });
    });

    describe('when passed positive numeric value', () => {
      it('should return correct number', () => {
        expect(DOMService.parseAttr('55')).toEqual(55);
      });
    });

    describe('when passed negative numeric value', () => {
      it('should return correct number', () => {
        expect(DOMService.parseAttr('-55')).toEqual(-55);
      });
    });

    describe('when passed zero', () => {
      it('should return correct number', () => {
        expect(DOMService.parseAttr('0')).toEqual(0);
      });
    });

    describe('when passed empty array', () => {
      it('should return undefined', () => {
        expect(DOMService.parseAttr('[]')).toBeUndefined();
      });
    });

    describe('when passed correct array presentation', () => {
      it('should return correct parsed array', () => {
        expect(DOMService.parseAttr('[1]')).toEqual([1]);
      });
    });

    describe('when passed correct array presentation', () => {
      describe('when there are several elements', () => {
        it('should return correct parsed array', () => {
          expect(DOMService.parseAttr('[1, 2, 3]')).toEqual([1, 2, 3]);
        });
      });
    });

    describe('when passed correct incorrect array presentation', () => {
      describe('when there are several incorrect elements', () => {
        it('should return correct parsed array', () => {
          expect(DOMService.parseAttr('[1?$, @2$, 3]')).toEqual([1, 2, 3]);
        });
      });
    });

    describe('when passed correct incorrect array presentation', () => {
      describe('when array format is incorrect', () => {
        it('should return undefined', () => {
          expect(DOMService.parseAttr('1?$, @2$, 3]')).toBeUndefined();
        });
      });
    });
  });
});

import DOMService from '../../src/services/dom.service';
import { IFixture } from '../fixtures';
import { createAttr } from '../helpers';

declare const fixture: IFixture;

describe('SVG', () => {

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
});

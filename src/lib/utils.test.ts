import { unitFixer, calculateDateOrdinal } from './utils';
import { DATE_ORDINALS } from '../lib/constants';

describe('Utility tests', () => {
  describe('unitFixer', () => {
    it.each`
      digit  | expected
      ${1}   | ${'01'}
      ${2}   | ${'02'}
      ${10}  | ${'10'}
      ${99}  | ${'99'}
      ${100} | ${'100'}
    `('expect "$digit" to be changed to "$expected"', ({ digit, expected }) => {
      expect(unitFixer(digit)).toEqual(expected);
    });
  });

  describe('calculateDateOrdinal', () => {
    it.each`
      digits                                  | expectedOrdinal
      ${[1, 21, 31]}                          | ${DATE_ORDINALS.ST}
      ${[2, 22]}                              | ${DATE_ORDINALS.ND}
      ${[3, 23]}                              | ${DATE_ORDINALS.RD}
      ${[4, 5, 6, 7, 8, 9, 10]}               | ${DATE_ORDINALS.TH}
      ${[11, 12, 13, 14, 15, 16, 17, 18, 19]} | ${DATE_ORDINALS.TH}
      ${[20, 24, 25, 26, 27, 28, 29, 30]}     | ${DATE_ORDINALS.TH}
    `(
      'expect "$digit" to have ordinal "$expectedOrdinal"',
      ({ digits, expectedOrdinal }) => {
        digits.forEach((digit: number) =>
          expect(calculateDateOrdinal(digit)).toEqual(expectedOrdinal)
        );
      }
    );
  });
});

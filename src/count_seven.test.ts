import { countSeven, hasSeven } from './count_seven';

describe('countSeven', () => {
	it('should return the correct value', () => {
		expect(countSeven(0)).toEqual(0);
		expect(countSeven(1)).toEqual(0);
		expect(countSeven(7)).toEqual(1);
		expect(countSeven(17)).toEqual(2);
		expect(countSeven(20)).toEqual(2);
		expect(countSeven(70)).toEqual(8);
		expect(countSeven(100)).toEqual(19);
		expect(countSeven(1000)).toEqual(271);
	});
});

describe('hasSeven', () => {
	it('should return whether the number contains the digit 7 or not', () => {
		expect(hasSeven(0)).toEqual(false);
		expect(hasSeven(1)).toEqual(false);
		expect(hasSeven(7)).toEqual(true);
		expect(hasSeven(17)).toEqual(true);
		expect(hasSeven(70)).toEqual(true);
		expect(hasSeven(77)).toEqual(true);
		expect(hasSeven(781)).toEqual(true);
		expect(hasSeven(891)).toEqual(false);
	});
});

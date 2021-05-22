import { countSeven, hasSeven, countSevenDP } from './count_seven';

describe('countSeven using for loop', () => {
	it('should return the correct value', () => {
		const start = Date.now();
		expect(countSeven(1000)).toEqual(271);
		const end = Date.now();
		console.log('spent time for countSeven', end - start);
	});
});

describe('countSevenDP using dynamic programming', () => {
	it('should return the correct value', () => {
		const start = Date.now();
		expect(countSevenDP(1000)).toEqual(271);
		const end = Date.now();
		console.log('spent time for countSevenDP', end - start);
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

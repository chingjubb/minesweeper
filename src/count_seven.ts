export const hasSeven = (num: number): boolean => {
	return num.toString().includes('7');
};

// using for loop
export const countSeven = (num: number): number => {
	let count = 0;
	for (let i = 1; i <= num; i++) {
		if (hasSeven(i)) {
			count++;
		}
	}
	return count;
}

// using dynamic programming -> much faster
export const countSevenDP = (num: number, map = {}): number => {
	if (num < 7) return 0;
	map = map || {}
	if (map[num]) {
		return map[num];
	}
	if (map[num - 1]) {
		const result =  (hasSeven(num) ? 1 : 0) + map[num - 1];
		map[num] = result;
		return result;
	}
	const count = (hasSeven(num) ? 1 : 0) + countSevenDP(num - 1, map);
	map[num] = count;
	return count;
}
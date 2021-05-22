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
	const baseCount = hasSeven(num) ? 1 : 0;
	let remainCount = 0;
	if (map[num - 1]) {
		remainCount = map[num - 1];
	} else {
		remainCount = countSevenDP(num - 1, map);
	}
	const count = baseCount + remainCount;
	map[num] = count;
	return count;
}
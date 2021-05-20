export const hasSeven = (num: number): boolean => {
	return num.toString().includes('7');
};

export const countSeven = (num: number): number => {
	let count = 0;
	for (let i = 1; i <= num; i++) {
		if (hasSeven(i)) {
			count++;
		}
	}
	return count;
}

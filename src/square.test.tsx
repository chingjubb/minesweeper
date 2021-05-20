import renderer from 'react-test-renderer';
import { Square } from './square';

test('unclicked tile', () => {
 	const component = renderer.create(
		<Square onRightClick={()=> {}} onClick={()=>{}} flagged={false} value={1} isBomb row={0} column={0} clicked={false} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('flagged tile', () => {
 	const component = renderer.create(
		<Square onRightClick={()=> {}} onClick={()=>{}} flagged value={1} isBomb row={0} column={0} clicked={false} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Bomb tile', () => {
 	const component = renderer.create(
		<Square onRightClick={()=> {}} onClick={()=>{}} flagged={false} value={1} isBomb row={0} column={0} clicked />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

describe('clicked tile ', ()=>{
	for (let i = 0; i <= 8; i++) {
		test(`clicked tile value = ${i}`, () => {
		 	const component = renderer.create(
				<Square onRightClick={()=> {}} onClick={()=>{}} flagged={false} value={i} isBomb={false} row={0} column={0} clicked />,
			);
			let tree = component.toJSON();
			expect(tree).toMatchSnapshot();
		});
	}
});

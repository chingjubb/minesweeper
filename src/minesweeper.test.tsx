import renderer from 'react-test-renderer';
import { Minesweeper } from './minesweeper';
import { Tile,
		 GameState,
		} from './minesweeper_reducer';

test('New game board', () => {
	const board: Tile[][] =
			 [[{row: 0, column: 0, isBomb: true, value: 0, clicked: false, flagged: false}],
			 [{row: 1, column: 0, isBomb: false, value: 1, clicked: false, flagged: false}]];

	const gameState: GameState = {
									board,
									isStarted: false,
									numBombs: 1,
									correctFlagged: 0,
									wrongFlagged: 0,
									isAlive: true };
 	const component = renderer.create(
		<Minesweeper gameState={gameState} dispatch={()=>{}} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Clicked a tile', () => {
	const board: Tile[][] =
		[[{row: 0, column: 0, isBomb: true, value: 0, clicked: false, flagged: false}],
		[{row: 1, column: 0, isBomb: false, value: 1, clicked: true, flagged: false}]];

	const gameState: GameState = {  board,
									isStarted: false,
									numBombs: 1,
									correctFlagged: 0,
									wrongFlagged: 0,
									isAlive: true };
 	const component = renderer.create(
		<Minesweeper gameState={gameState} dispatch={()=>{}} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Game over state', () => {
	const board: Tile[][] =
			 [[{row: 0, column: 0, isBomb: true, value: 0, clicked: true, flagged: false}],
			 [{row: 1, column: 0, isBomb: false, value: 1, clicked: false, flagged: false}]];

	const gameState: GameState = {
									board,
									isStarted: true,
									numBombs: 1,
									correctFlagged: 0,
									wrongFlagged: 1,
									isAlive: false };
 	const component = renderer.create(
		<Minesweeper gameState={gameState} dispatch={()=>{}} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('Flag a bomb', () => {
	const board: Tile[][] =
			 [[{row: 0, column: 0, isBomb: true, value: 0, clicked: false, flagged: false}],
			 [{row: 1, column: 0, isBomb: false, value: 1, clicked: false, flagged: true}]];

	const gameState: GameState = {  board,
									isStarted: true,
									numBombs: 1,
									correctFlagged: 1,
									wrongFlagged: 1,
									isAlive: true };
 	const component = renderer.create(
		<Minesweeper gameState={gameState} dispatch={()=>{}} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

test('You won state', () => {
	const board: Tile[][] =
			 [[{row: 0, column: 0, isBomb: true, value: 0, clicked: false, flagged: true}],
			 [{row: 1, column: 0, isBomb: false, value: 1, clicked: false, flagged: false}]];

	const gameState: GameState = {  board,
									isStarted: true,
									numBombs: 1,
									correctFlagged: 1,
									wrongFlagged: 0,
									isAlive: true };
 	const component = renderer.create(
		<Minesweeper gameState={gameState} dispatch={()=>{}} />,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

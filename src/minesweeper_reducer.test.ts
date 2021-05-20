import { MineSweeperReducer, ActionTypes, GameState, Tile, initializeBoard } from './minesweeper_reducer';

const board: Tile[][] =
			 [[{row: 0, column: 0, isBomb: true, value: 0, clicked: false, flagged: false}],
			 [{row: 1, column: 0, isBomb: false, value: 1, clicked: false, flagged: false}]];

describe('MineSweeperReducer', () => {
	let state: GameState;
	beforeEach(() => {
		state =  { board,
				   isAlive: true,
				   isStarted: false,
				   correctFlagged: 0,
				   wrongFlagged: 0,
				   numBombs: 1 };
	});
	describe(ActionTypes.clickTile, () => {
		it('first click on bomb should swap with another clean tile', () => {
			const nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.clickTile, row: 0, column: 0});
			expect(nextState.isAlive).toEqual(true);
			expect(nextState.isStarted).toEqual(true);
			expect(nextState.board[0][0].isBomb).toEqual(false);
			expect(nextState.board[1][0].isBomb).toEqual(true);
		});

		it('click on a clean tile should set clicked to true', () => {
			const nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.clickTile, row: 1, column: 0});
			expect(nextState.isAlive).toEqual(true);
			expect(nextState.isStarted).toEqual(true);
			expect(nextState.board[1][0].clicked).toEqual(true);
		});

		it('click on a bomb should set isAlive to false', () => {
			let nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.clickTile, row: 0, column: 0});
			nextState = MineSweeperReducer(nextState,
				{ type: ActionTypes.clickTile, row: 1, column: 0});
			expect(nextState.isAlive).toEqual(false);
		});

		it('click on a flagged tile should be safe if it is a bomb', () => {
			let nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.clickTile, row: 1, column: 0});
			nextState = MineSweeperReducer(nextState,
				{ type: ActionTypes.setFlag, row: 0, column: 0});
			nextState = MineSweeperReducer(nextState,
				{ type: ActionTypes.clickTile, row: 0, column: 0});
			expect(nextState.isAlive).toEqual(true);
		});
	});

	describe(ActionTypes.setFlag, () => {
		it('should set flagged to true to a tile', () => {
			const nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.setFlag, row: 0, column: 0});
			expect(nextState.isAlive).toEqual(true);
			expect(nextState.isStarted).toEqual(true);
			expect(nextState.board[0][0].flagged).toEqual(true);
		});

		it('use setFlag twice should remove the flag', () => {
			let nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.setFlag, row: 0, column: 0});
			nextState = MineSweeperReducer(nextState,
				{ type: ActionTypes.setFlag, row: 0, column: 0});
			expect(nextState.board[0][0].flagged).toEqual(false);
		});
	});

	describe(ActionTypes.restartGame, () => {
		it('should restart the game', () => {
			const state: GameState = { board,
									   isAlive: false,
									   isStarted: true,
									   correctFlagged: 0,
									   wrongFlagged: 1,
									   numBombs: 1 };
			const nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.restartGame, numRows: 10, numColumns: 10, numBombs: 10});
			expect(nextState.isAlive).toEqual(true);
			expect(nextState.isStarted).toEqual(false);
			expect(nextState.wrongFlagged).toEqual(0);
			expect(nextState.correctFlagged).toEqual(0);
			expect(nextState.numBombs).toEqual(10);
			expect(nextState.board.length).toEqual(10);
			expect(nextState.board[0].length).toEqual(10);
		});
	});
});

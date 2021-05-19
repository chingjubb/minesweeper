import { MineSweeperReducer, ActionTypes, GameState, Tile, initializeBoard } from './minesweeper_reducer';

const board: Tile[][] =
			 [[{row: 0, column: 0, isBomb: true, value: 0, clicked: false, flagged: false}],
			 [{row: 1, column: 0, isBomb: false, value: 1, clicked: false, flagged: false}]];

describe('MineSweeperReducer', () => {
	describe(ActionTypes.clickTile, () => {
		it('first click on bomb should swap with another clean tile', () => {
			const state: GameState = { board,
									   isAlive: true,
									   isStarted: false };
			const nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.clickTile, row: 0, column: 0});
			expect(nextState.isAlive).toEqual(true);
			expect(nextState.isStarted).toEqual(true);
			expect(nextState.board[0][0].isBomb).toEqual(false);
			expect(nextState.board[1][0].isBomb).toEqual(true);
		});

		it('click on a clean tile should set clicked to true', () => {
			const state: GameState = { board,
									   isAlive: true,
									   isStarted: false };
			const nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.clickTile, row: 1, column: 0});
			expect(nextState.isAlive).toEqual(true);
			expect(nextState.isStarted).toEqual(true);
			expect(nextState.board[1][0].clicked).toEqual(true);
		});
	})
	describe(ActionTypes.setFlag, () => {
		it('should set flagged to true to a tile', () => {
			const state: GameState = { board,
									   isAlive: true,
									   isStarted: false };
			const nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.setFlag, row: 0, column: 0});
			expect(nextState.isAlive).toEqual(true);
			expect(nextState.isStarted).toEqual(true);
			expect(nextState.board[0][0].flagged).toEqual(true);
		});

		it('use setFlag twice should remove the flag', () => {
			const state: GameState = { board,
									   isAlive: true,
									   isStarted: false };
			let nextState: GameState = MineSweeperReducer(state,
				{ type: ActionTypes.setFlag, row: 0, column: 0});
			nextState = MineSweeperReducer(nextState,
				{ type: ActionTypes.setFlag, row: 0, column: 0});
			expect(nextState.board[0][0].flagged).toEqual(false);
		});
	})
});

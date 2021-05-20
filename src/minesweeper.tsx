import { Dispatch } from 'react';
import { Tile,
		 GameState,
		 GameAction,
		 NUM_BOMBS,
		 NUM_COLUMN,
		 NUM_ROW,
		 ActionTypes } from './minesweeper_reducer';
import styles from './minesweeper.module.css';
import { Square, BOMB_ICON, FLAG_ICON } from './square';
import Button from '@material-ui/core/Button';

type MinesweeperProps = {
	gameState: GameState;
	dispatch: Dispatch<GameAction>;
};

export const Minesweeper = ({ gameState, dispatch }: MinesweeperProps) => {
	const board: Tile[][] = gameState.board;
	const isAlive: boolean = gameState.isAlive;
	const hasWon: boolean = gameState.numBombs === gameState.correctFlagged
							&& gameState.wrongFlagged === 0;

	const renderGameStates = () => {
		return (<div className={styles.gameStates}>
				  <div>{BOMB_ICON}: {gameState.numBombs}</div>
				  <div>{FLAG_ICON}: {gameState.correctFlagged + gameState.wrongFlagged}</div>
				</div>)
	};

	const renderBoard = () => {
		return <div>{board.map((thisRow: Tile[], row: number) => {
		return <div key={row} className={styles.row}>
				{thisRow.map((tile: Tile, column: number) => {
				return <Square {...tile}
							   key={`${row}.${column}.${tile.clicked}.${tile.flagged}`}
							   onRightClick={() => {
							   		if (!isAlive) return;
							   		dispatch({type: ActionTypes.setFlag,
							   				  row,
							   				  column})
							   }}
							   onClick={() => {
							   		if (!isAlive) return;
							   		dispatch({type: ActionTypes.clickTile,
							   				  row,
							   				  column})}
							}/>
					})}</div>
				})}</div>;
	};

	const restartGameButton = () => {
		return (<Button variant="contained" color="primary"
					onClick={() => {
						dispatch({ type: ActionTypes.restartGame,
									numRows: NUM_ROW,
									numColumns: NUM_COLUMN,
									numBombs: NUM_BOMBS }) }}>
					  Restart Game
				</Button>);
	}

	return (<div className={styles.gameBoard}>
				<div>{renderBoard()}</div>
				{renderGameStates()}
				{hasWon && <div><div>You Won!</div>{restartGameButton()}</div>}
				{!isAlive && <div><div>Game Over!</div>{restartGameButton()}</div>}
			</div>);
};

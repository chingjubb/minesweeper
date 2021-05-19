import { Dispatch } from 'react';
import { Tile,
		 GameState,
		 GameAction,
		 ActionTypes } from './minesweeper_reducer';
import styles from './minesweeper.module.css';
import { Square } from './square';

type MinesweeperProps = {
	gameState: GameState;
	dispatch: Dispatch<GameAction>;
};

export const Minesweeper = ({ gameState, dispatch }: MinesweeperProps) => {
	const board: Tile[][] = gameState.board;
	const isAlive: boolean = gameState.isAlive;

	const renderBoard = () => {
		return <div>{board.map((thisRow: Tile[], row: number) => {
		return <div key={row} className={styles.row}>
				{thisRow.map((tile: Tile, column: number) => {
				return <Square {...tile}
							   key={`${row}.${column}.${tile.clicked}.${tile.flagged}`}
							   onRightClick={() => {
							   		dispatch({type: ActionTypes.setFlag,
							   				  row,
							   				  column})
							   }}
							   onClick={() => {
							   		dispatch({type: ActionTypes.clickTile,
							   				  row,
							   				  column})}
							}/>
					})}</div>
				})}</div>;
	};

	const renderGameOverText = () => {
		return (<div className={styles.gameOverText}
					onClick={() => {
						dispatch({ type: ActionTypes.restartGame }) }}>
					Game over! Click here to restart.
				</div>);
	};

	return (<div className={styles.gameBoard}>
				<div>{renderBoard()}</div>
				{!isAlive && renderGameOverText()}
			</div>);
};

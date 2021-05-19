import { Tile,
		 initializeBoard,
		 useMineSweeperReducer,
		 NUM_BOMBS,
		 NUM_COLUMN,
		 NUM_ROW,
		 ActionTypes } from './minesweeper_reducer';
import styles from './minesweeper.module.css';
import classnames from 'classnames';

function App() {
	const [config, dispatch] = useMineSweeperReducer({
									board: initializeBoard(NUM_ROW, NUM_COLUMN, NUM_BOMBS),
									isStarted: false,
									isAlive: true });	
	const board: Tile[][] = config.board;
	const isAlive: boolean = config.isAlive;

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

type SquareProps = {
	onClick: () => void;
	onRightClick: () => void;
} & Tile;

const Square = (props: SquareProps) => {
	const { isBomb, flagged, clicked, onClick, value, onRightClick } = props;
	if (flagged) {
		return <div onContextMenu={(e) => {
						e.preventDefault();
						onRightClick();
					}}
					onClick={onClick}
					className={classnames(styles.tile, styles.flagged)}>{'🏁'}</div>
	}

	if (!clicked) {
		return <div onClick={onClick}
					onContextMenu={(e) => {
						e.preventDefault();
						onRightClick();
					}}
					className={classnames(styles.tile,
										  styles.unclickedTile)} />
	}
	
	if (isBomb) {
		return <div className={classnames(styles.bomb,
										  styles.tile)}>
					{'💣'}
				</div>
	}
	const getValueStyle = (value: number) => {
		switch (value) {
			case 1: return styles.oneBomb;
			case 2: return styles.twoBombs;
			case 3: return styles.threeBombs;
			case 4: return styles.fourBombs;
			case 5: return styles.fiveBombs;
			case 6: return styles.sixBombs;
			case 7: return styles.sevenBombs;
			case 8: return styles.eightBombs;
			default:
				return '';
		}
	}
	return <div className={classnames(styles.clickedTile,
								      styles.tile, getValueStyle(value))}>
				{value > 0 ? value : ''}
			</div>
}

export default App;

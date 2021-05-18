import { Tile,
		 initializeBoard,
		 useMineSweeperReducer,
		 ActionTypes } from './minesweeper_reducer';
import styles from './minesweeper.module.css';
import classnames from 'classnames';

function App() {
	const [config, dispatch] = useMineSweeperReducer({ board: initializeBoard(10, 10, 15) });	
	const board: Tile[][] = config.board;

	return <div>{board.map((thisRow: Tile[], row: number) => {
		return <div key={row} style={{display: 'flex'}}>
				{thisRow.map((tile: Tile, column: number) => {
				return <Square {...tile}
							   key={row + '' + column + '' + tile.clicked + '' + tile.flagged}
							   onClick={() => {
							   		dispatch({type: ActionTypes.clickTile,
							   				  row,
							   				  column})}
							}/>
		})}</div>
	})}</div>;
}

type SquareProps = {
	onClick: () => void;
} & Tile;

const Square = (props: SquareProps) => {
	const { isBomb, flagged, clicked, onClick, value } = props;
	if (!clicked) {
		return <div onClick={onClick}
					className={classnames(styles.tile,
										  styles.unclickedTile)} />
	}
	if (flagged) {
		return <div>F</div>
	}
	
	if (isBomb) {
		return <div className={classnames(styles.bomb,
										  styles.tile)}>
					{'💣'}
				</div>
	}

	return <div className={classnames(styles.clickedTile,
								      styles.tile)}>
				{value > 0 ? value : ''}
			</div>
}

export default App;

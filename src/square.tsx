import { Tile } from './minesweeper_reducer';
import styles from './minesweeper.module.css';
import classnames from 'classnames';

type SquareProps = {
	onClick: () => void;
	onRightClick: () => void;
} & Tile;

export const Square = (props: SquareProps) => {
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
};

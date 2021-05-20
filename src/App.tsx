import { initializeBoard,
		 useMineSweeperReducer,
		 NUM_BOMBS,
		 NUM_COLUMN,
		 NUM_ROW,} from './minesweeper_reducer';
import { Minesweeper } from './minesweeper';

function App() {
	const [config, dispatch] = useMineSweeperReducer({
									board: initializeBoard(NUM_ROW, NUM_COLUMN, NUM_BOMBS),
									isStarted: false,
									numBombs: NUM_BOMBS,
									correctFlagged: 0,
									wrongFlagged: 0,
									isAlive: true });
	return <Minesweeper dispatch={dispatch} gameState={config}/>
};

export default App;

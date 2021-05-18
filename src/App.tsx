// import "./App.css";

type Tile = {
	isBomb: boolean;
	row: number;
	column: number;
	clicked: boolean;
	flagged: boolean;
}

function App() {
	const numRow = 10;
	const numColumn = 10;
	const numBombs = 10;

	// init the board
	const board: Tile[][] = [];
	for (let i = 0; i < numRow; i++) {
		const thisRow: Tile[] = [];
		for (let j = 0; j < numColumn; j++) {
			thisRow[j] = { isBomb: false, row: i, column: j, clicked: false, flagged: false }; 
		}
		board.push(thisRow);
	}

	// Set bombs to random column and row
	let numBombSet = 0;
	while (numBombSet < numBombs) {
		const randomRow = Math.floor(Math.random() * numRow);
		const randomColumn = Math.floor(Math.random() * numColumn);
		if (!board[randomRow][randomColumn].isBomb) {
			board[randomRow][randomColumn].isBomb = true;
			numBombSet++;
		}
	}
	
	console.log('board', board);
	return <div>Mine sweeper</div>;
}

const Square = (props: Tile) => {
	const { isBomb, row, column, clicked, flagged } = props;

	return <div>{isBomb}</div>
}


export default App;

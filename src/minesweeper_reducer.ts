import { useReducer, Dispatch } from "react";
import { produce } from "immer";

export const NUM_ROW = 14;
export const NUM_COLUMN = 18;
export const NUM_BOMBS = 40;

export type Tile = {
  isBomb: boolean;
  row: number;
  column: number;
  clicked: boolean;
  flagged: boolean;
  value: number; // number of bombs next to it
}

export type GameState = {
  board: Tile[][];
  isStarted: boolean; // false means game has not started
  isAlive: boolean; // false means game over
};

export const ActionTypes = {
  clickTile: "clickTile",
  setFlag: 'setFlag',
  restartGame: 'restartGame',
} as const;

export type GameAction =
  | {
      type: typeof ActionTypes.clickTile;
      row: number;
      column: number;
    }
  | {
      type: typeof ActionTypes.setFlag;
      row: number;
      column: number;
    }
  | {
      type: typeof ActionTypes.restartGame;
    };

export const MineSweeperReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "clickTile":
      return produce(state, draft => {
        if (!state.isAlive) return;
        const tile: Tile = draft.board[action.row][action.column];
        if (!state.isStarted
            && tile.isBomb
            && (state.board.length > 1
            || state.board[0].length > 1)) {
          // The first click can't be a bomb
          // Need to swap with another clean tile
          swapWithAnotherTile(draft.board, action.row, action.column)
        }
        if (tile.flagged) {
          // do nothing
        } else if (tile.clicked) {
          // do nothing
        } else if (tile.isBomb) {
          // show game over screen
          tile.clicked = true;
          draft.isAlive = false;
        } else {
          // calculate number of bombs next to it
          clearBoardStartWith(draft.board, action.row, action.column);
        }
        draft.isStarted = true;
        draft.board[action.row][action.column] = tile;
      });
    case 'setFlag':
      return produce(state, draft => {
        const tile: Tile = draft.board[action.row][action.column];
        if (tile.clicked) {
          // do nothing
        } else {
          tile.flagged = !tile.flagged;
        }
        draft.isStarted = true;
        draft.board[action.row][action.column] = tile;
      });
    case 'restartGame':
      return produce(state, draft => {
        draft.board = initializeBoard(NUM_ROW, NUM_COLUMN, NUM_BOMBS);
        calculateValue(draft.board, NUM_ROW, NUM_COLUMN);
        draft.isAlive = true;
        draft.isStarted = false;
      });
    default:
      return state;
  }
};

const swapWithAnotherTile = (board, row, column) => {
  let swapped = false;
  const tile = board[row][column];
  const numRows = board.length;
  const numColumns = board[0].length;
  while (!swapped) {
    const row2 = Math.floor(Math.random() * numRows);
    const column2 = Math.floor(Math.random() * numColumns);
    const anotherTile = board[row2][column2];
    if (!anotherTile.isBomb) {
      console.log('swap!!');
      anotherTile.isBomb = true;
      tile.isBomb = false;
      swapped = true;
    }
  }
  calculateValue(board, numRows, numColumns);
}

const clearBoardStartWith = (board, row, column) => {
  if (!board[row]?.[column]) return;
  if (board[row][column].isBomb) return;
  if (board[row][column].flagged) return;
  if (board[row][column].clicked) return;
  board[row][column].clicked = true;
  if (board[row][column].value > 0) return;
  clearBoardStartWith(board, row + 1, column);
  clearBoardStartWith(board, row + 1, column + 1);
  clearBoardStartWith(board, row + 1, column - 1);
  clearBoardStartWith(board, row, column + 1);
  clearBoardStartWith(board, row, column - 1);
  clearBoardStartWith(board, row - 1, column + 1);
  clearBoardStartWith(board, row - 1, column);
  clearBoardStartWith(board, row - 1, column - 1);
}

// usage example:
// const [state, dispatch] = useMineSweeperReducer(initialState);
export const useMineSweeperReducer = (
  initialState: GameState
): [GameState, Dispatch<GameAction>] => {
  const [config, dispatch] = useReducer(MineSweeperReducer, initialState);
  return [config, dispatch];
};

export const initializeBoard = (numRow, numColumn, numBombs) => {
  // init the board
  const board: Tile[][] = [];
  for (let i = 0; i < numRow; i++) {
    const thisRow: Tile[] = [];
    for (let j = 0; j < numColumn; j++) {
      thisRow[j] = { isBomb: false,
                     row: i,
                     column: j,
                     clicked: false,
                     flagged: false,
                     value: 0 }; 
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

  // Calculate number of bombs 
  calculateValue(board, numRow, numColumn);
  return board;
}

const calculateValue = (board, numRow, numColumn) => {
  // Calculate number of bombs 
  for (let i = 0; i < numRow; i++) {
    for (let j = 0; j < numColumn; j++) {
      let value = 0;
      if (board[i + 1]?.[j]?.isBomb) value++;
      if (board[i - 1]?.[j]?.isBomb) value++;
      if (board[i + 1]?.[j + 1]?.isBomb) value++;
      if (board[i - 1]?.[j - 1]?.isBomb) value++;
      if (board[i]?.[j + 1]?.isBomb) value++;
      if (board[i]?.[j - 1]?.isBomb) value++;
      if (board[i + 1]?.[j - 1]?.isBomb) value++;
      if (board[i - 1]?.[j + 1]?.isBomb) value++;
      board[i][j].value = value;
    }
  }
}


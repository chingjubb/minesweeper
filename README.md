# Mine Sweeper Game

## Instructions
After cloning this repo, switch to minesweeper branch:

`git checkout minesweeper`

`npm install`

`npm run start`

open http://localhost:3000/ in your browser to start playing the game

`npm run test` to run tests

## Description:

The Minesweeper game is composed of 4 types of source files:

(1) React component files, for example: `App.tsx`, `minesweeper.tsx`, `square.tsx`

(2) Module CSS files: for example: `minsweeper.module.css`, `square.module.css`

(3) Reducer file, for example: `minesweeper_reducer.tsx`

(4) Test files: `minesweeper_reducer.test.ts`, `minesweeper.test.tsx`, `square.test.tsx`,
there are regular tests and snapshot tests.

The entry file is `App.tsx`, inside this file, we have a Minesweeper component.

The main thing in the `Minesweeper` component is a 2D array, the board. 
We render element in this 2D array as a `Square` component.

The game state and logic is written in minesweeper_reducer.tsx. 
Each time the user clicks on a Square or right clicks to flag a Square, we dispatch an event to the reducer and update the game state.

The game goes on until we reach a win or lose condition.
We win by flagging all the bombs correctly.
We lose by clicking on any bomb.

After winning or losing, user can click 'Restart Game' button to restart the game.


## Part 3, Counting 7s
The file is `count_seven.ts` and `count_seven.test.ts`

`npm run test` to run tests.



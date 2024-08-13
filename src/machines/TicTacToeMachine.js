import { createMachine, assign } from "xstate";

const checkWin = (board) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of winningCombos) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export const ticTacToeMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcCWBjAKgQywezADpUIAbMAYgGVMBBAJUwH0BxWgWQFEBtABgF1EoAA55YqNHgB2QkAA9EAdgAcAZkIAWAIwA2HQCZVvRao06tGgDQgAnog379hXtr2qArFt7KtATkUAvgHWaFi4mASEwqTYNqhSUBTstADSnEzsAPIAajwCsqLikjJI8kpqmroGRiZmFtZ2CD6EVToqvC5a7qqKgcEgoTj4ROgAFmDoANbxUADq8RR8gqWFEqjSsgoI+l2E7q56ir77-ioN9t6E-r5aiu7KOu4GKkEhGEMRI+NTM-NSi1pliIxGsNqUtjt3HsDm1jhpTspzghVLdCMp9lofMdFPpFDpVK8Bu9wpExhNpgk-ot9ECQKtiptEJDoa0jideojbEz9DpCDibsplC5lL59BplITBiSiFBsABbMCZABuYAAThR6JwqJxMEsCiCGeDEO59LxCGLfL4dDdeF1eD0kapLZojl0BRYNN4gv0pHgIHBZFLhvqiusSqAtgBaHRI6PODoJxOJvpvMLDYhkMAh0HhsoIPQaZxqfSix5PIX6JEOJwYx72-aqNoS-pBz5RGJxBLZw0RxBefFXV2GDQjxQadxI-TuM2da3GPRtdwmyXE9Nkn6U+LdsOMhAOKuosW3Holh47FNEtNt2UK5Vq7dg3vIm7OHEi+63CyC1RVxws-GODoDhmB43oBEAA */
    id: "ticTacToe",
    initial: "idle",
    context: {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: undefined,
    },
    states: {
      idle: {
        on: {
          START_GAME: {
            target: "playing",
          },
        },
      },
      playing: {
        on: {
          MAKE_MOVE: [
            {
              guard: "isSquareEmpty",
              actions: "markSquare",
              target: "checkingWin",
            },
          ],
          GAME_RESET: [
            {
              target: "idle",
              actions: "resetGame",
            },
          ],
        },
      },
      checkingWin: {
        always: [
          {
            guard: "isWinner",
            actions: "setWinner",
            target: "gameOver",
          },
          {
            guard: "isDraw",
            actions: "setDraw",
            target: "gameOver",
          },
          { target: "playing", actions: "switchPlayer" },
        ],
      },
      gameOver: {
        on: {
          GAME_RESET: {
            target: "idle",
            actions: "resetGame",
          },
        },
      },
    },
  },
  {
    guards: {
      isSquareEmpty: ({ context, event }) => {
        return context.board[event.index] === null;
      },
      isWinner: ({ context }) => !!checkWin(context.board),
      isDraw: ({ context }) =>
        context.board.every((square) => square !== null) &&
        !checkWin(context.board),
    },
    actions: {
      markSquare: assign({
        board: ({ context, event }) => {
          const newBoard = context.board.slice();
          newBoard[event.index] = context.currentPlayer;
          return newBoard;
        },
      }),
      switchPlayer: assign({
        currentPlayer: ({ context }) =>
          context.currentPlayer === "X" ? "O" : "X",
      }),
      setWinner: assign({
        winner: ({ context }) => checkWin(context.board),
      }),
      setDraw: assign({
        winner: () => "draw",
      }),
      resetGame: assign({
        board: () => Array(9).fill(null),
        currentPlayer: () => "X",
        winner: () => null,
      }),
    },
  }
);

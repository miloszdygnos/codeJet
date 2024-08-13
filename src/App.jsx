import { ticTacToeMachine } from "./machines/TicTacToeMachine";
import { useMachine } from "@xstate/react";
import { Grid, Cell, WinningHeader, ResetBtn } from "./styles/TicTacToe-styles";
import "./index.css";

export default function App() {
  const [state, send] = useMachine(ticTacToeMachine);
  const { board, currentPlayer, winner } = state.context;
  const handleCellClick = (index) => {
    send({ type: "START_GAME" });
    if (!winner && board[index] === null) {
      send({ type: "MAKE_MOVE", index });
    }
  };
  const handleGameReset = () => {
    send({ type: "GAME_RESET" });
  };

  return (
    <div>
      <WinningHeader>
        {winner
          ? winner === "draw"
            ? "It's a draw!"
            : `${winner} won`
          : `It is ${currentPlayer}'s turn`}
      </WinningHeader>
      <Grid>
        {board.map((cell, index) => {
          return (
            <Cell
              onClick={() => handleCellClick(index)}
              key={index}
              content={cell}
              player={currentPlayer}
            >
              {cell}
            </Cell>
          );
        })}
      </Grid>
      <ResetBtn onClick={handleGameReset}>Reset</ResetBtn>
    </div>
  );
}

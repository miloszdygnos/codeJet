import styled from "styled-components";

export const WinningHeader = styled.div`
  font-size: 2rem;
  text-align: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Grid = styled.div`
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  border: 1px solid black;
`;
export const Cell = styled.div`
    width:100%,
    height:100%,
    border:1px solid black;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:3em; 
    font-weight:700;
    transition:background .1s;
    cursor:pointer;
    border:1px solid black;
    &:hover {
    background-color: ${({ player }) =>
      player === "X"
        ? "lightblue"
        : player === "O"
        ? "lightcoral"
        : "transparent"};
  }
  color: ${({ content }) =>
    content === "X" ? "blue" : content === "O" ? "red" : "transparent"};
  &
`;
export const ResetBtn = styled.button`
  width: 100%;
  height: 50px;
  font-size: 22px;
  margin-top: 20px;
  background-color: #1956dd;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #073499;
  }
`;

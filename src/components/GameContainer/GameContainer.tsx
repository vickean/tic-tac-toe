import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import AdjustIcon from "@material-ui/icons/Adjust";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React, { Fragment, useEffect, useState } from "react";
import useStyles from "./GameContainerStyles";

function GameContainer(props: any) {
  const classes = useStyles();

  const squares: { state: number }[][] = [
    [{ state: 0 }, { state: 0 }, { state: 0 }],
    [{ state: 0 }, { state: 0 }, { state: 0 }],
    [{ state: 0 }, { state: 0 }, { state: 0 }],
  ];

  const [boardState, setBoardState] = useState(squares);
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  const [gameState, setGameState] = useState("PLAY"); // "PLAY", "P1_WIN", "P2_WIN", "DRAW"

  const statusStyle = (status: string) => {
    const gameStatus: {
      [index: string]: { text: string; color: string; backgroundColor: string };
    } = {
      PLAY: {
        text: "IN PLAY",
        color: "white",
        backgroundColor: "green",
      },
      P1_WIN: {
        text: "PLAYER 1 WINS",
        color: "black",
        backgroundColor: "white",
      },
      P2_WIN: {
        text: "PLAYER 2 WINS",
        color: "white",
        backgroundColor: "black",
      },
      DRAW: {
        text: "DRAW",
        color: "black",
        backgroundColor: "red",
      },
    };

    return gameStatus[`${status}`];
  };

  const handleSquareClick = (rowNum: number, colNum: number) => {
    let newBoardState = JSON.parse(JSON.stringify(boardState));

    const value = playerOneTurn ? 1 : 2;

    if (newBoardState[rowNum][colNum].state === 0) {
      newBoardState[rowNum][colNum].state = value;
    }

    console.log(
      boardState[rowNum][colNum].state,
      "=>",
      newBoardState[rowNum][colNum].state
    );

    if (gameState === "PLAY" && boardState[rowNum][colNum].state === 0) {
      setBoardState(newBoardState);
      setPlayerOneTurn(!playerOneTurn);
    }
  };

  const handleReset = () => {
    setBoardState(squares);
    setPlayerOneTurn(true);
    setGameState("PLAY");
  };

  const gridTraverser = (
    squareState: { state: number }[][]
  ): { done: boolean; stateString: string } => {
    let done: boolean = true;

    let stateString: string = "";

    let rowNum: number = 0;

    squareState.map((row: { state: number }[], rowIdx: number) => {
      row.map((el: { state: number }) => {
        if (rowIdx !== rowNum) {
          stateString = stateString + "-";
          rowNum++;
        }

        stateString = stateString + el.state;

        if (el.state < 1) {
          done = false;
        }

        return null;
      });

      return null;
    });

    return { done, stateString };
  };

  const aiMove = (
    squareState: { state: number }[][]
  ): { row: number; col: number } => {
    const { stateString } = gridTraverser(squareState);

    console.log("MOVE!", stateString);

    return { row: 0, col: 0 };
  };

  const checkSquares = (squareState: { state: number }[][]) => {
    console.log("CHECK!");

    const { done, stateString } = gridTraverser(squareState);

    const p1win: boolean = /1{3}-.{3}-.{3}|.{3}-.{3}-1{3}|.{3}-1{3}-.{3}|1..-.1.-..1|.1.-.1.-.1.|..1-.1.-1..|1..-1..-1..|..1-..1-..1/.test(
      stateString
    );

    const p2win: boolean = /2{3}-.{3}-.{3}|.{3}-.{3}-2{3}|.{3}-2{3}-.{3}|2..-.2.-..2|.2.-.2.-.2.|..2-.2.-2..|2..-2..-2..|..2-..2-..2/.test(
      stateString
    );

    console.log(stateString, p1win, p2win);

    if (p1win) {
      setGameState("P1_WIN");
    } else if (p2win) {
      setGameState("P2_WIN");
    } else if (done) {
      setGameState("DRAW");
    }
  };

  const ButtonItem = (props: any) => {
    const { rowNum, colNum } = props;

    const icon = (state: number) => {
      switch (state) {
        case 0:
          return <div />;
        case 1:
          return <AdjustIcon style={{ fontSize: "10rem", margin: "auto" }} />;
        case 2:
          return <HighlightOffIcon style={{ fontSize: "10rem", margin: "auto" }} />;
      }
    };

    return (
      <Fragment>
        <Grid item xs={4}>
          <Paper
            className={classes.square}
            onClick={() => {
              handleSquareClick(rowNum, colNum);
            }}
          >
            {icon(boardState[rowNum][colNum]?.state)}
          </Paper>
        </Grid>
      </Fragment>
    );
  };

  const ButtonRow = (props: any) => {
    const { row, rowNum } = props;

    return (
      <Fragment>
        <Grid item container xs={12}>
          {row.map((el: { state: number }, i: number) => (
            <ButtonItem key={`item${i}`} item={el} rowNum={rowNum} colNum={i} />
          ))}
        </Grid>
      </Fragment>
    );
  };

  const ButtonArray = (props: any) => {
    const { source } = props;

    return (
      <Grid container>
        {source.map((el: { state: number }[], i: number) => (
          <ButtonRow key={`row${i}`} row={el} rowNum={i} />
        ))}
      </Grid>
    );
  };

  useEffect(() => {
    checkSquares(boardState);
    aiMove(boardState);
  }, [boardState]);

  return (
    <div className={classes.root}>
      <ButtonArray source={squares} />
      <div>
        <Grid container>
          <Grid item xs={12}>
            <div
              style={{
                backgroundColor: playerOneTurn ? "white" : "black",
                color: playerOneTurn ? "black" : "white",
                margin: "1rem",
                textAlign: "center",
                border: "solid 2px black",
              }}
            >
              <Typography variant="h5">Player {playerOneTurn ? 1 : 2}</Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <Dialog
        open={gameState !== "PLAY"}
        onClose={handleReset}
        style={{ display: gameState !== "PLAY" ? "block" : "none" }}
      >
        <DialogContent
          style={{
            backgroundColor: statusStyle(gameState).backgroundColor,
            color: statusStyle(gameState).color,
            textAlign: "center",
          }}
        >
          <Typography variant="h1" style={{ textAlign: "center" }}>
            {statusStyle(gameState).text}
          </Typography>
          <Button
            onClick={handleReset}
            style={{ margin: "1rem", color: statusStyle(gameState).color }}
          >
            Restart
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GameContainer;

import { Grid, Paper } from "@material-ui/core";
import AdjustIcon from "@material-ui/icons/Adjust";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React, {
  Fragment,
  ReactElement,
  cloneElement,
  useState,
  useEffect,
} from "react";
import useStyles from "./GameContainerStyles";

function GameContainer(props: any) {
  const classes = useStyles();

  const squares: { state: number }[][] = [
    [{ state: 0 }, { state: 1 }, { state: 2 }],
    [{ state: 2 }, { state: 0 }, { state: 1 }],
    [{ state: 1 }, { state: 2 }, { state: 0 }],
  ];

  const [boardState, setBoardState] = useState(squares);
  const [playerOneTurn, setPlayerOneTurn] = useState(true);

  const sayHi = (rowNum: number, colNum: number) => {
    const newBoardState = boardState;

    newBoardState[rowNum][colNum].state = playerOneTurn ? 1 : 2;

    console.log("Board", newBoardState);

    setBoardState(newBoardState);

    console.log(rowNum, colNum);
  };

  console.log(boardState);

  const ButtonItem = (props: any) => {
    const { rowNum, colNum } = props;

    const icon = (state: number) => {
      switch (state) {
        case 0:
          return <div />;
        case 1:
          return <AdjustIcon />;
        case 2:
          return <HighlightOffIcon />;
      }
    };

    return (
      <Fragment>
        <Grid item xs={4}>
          <Paper
            className={classes.square}
            onClick={() => {
              sayHi(rowNum, colNum);
            }}
          >
            {cloneElement(icon(boardState[rowNum][colNum]?.state) as ReactElement, {
              style: {
                fontSize: "10rem",
                margin: "auto",
              },
            })}
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
    console.log(boardState);
  }, [boardState]);

  return (
    <div className={classes.root}>
      <ButtonArray source={boardState} />
    </div>
  );
}

export default GameContainer;

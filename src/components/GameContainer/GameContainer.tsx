import { Grid, Paper } from "@material-ui/core";
import React, { Fragment } from "react";
import useStyles from "./GameContainerStyles";

function GameContainer(props: any) {
  const classes = useStyles();

  const ButtonItem = (props: any) => {
    return (
      <Fragment>
        <Grid item xs={4}>
          <Paper className={classes.square}>Item</Paper>
        </Grid>
      </Fragment>
    );
  };

  const ButtonRow = (props: any) => {
    return (
      <Fragment>
        <Grid item container xs={12}>
          <ButtonItem />
          <ButtonItem />
          <ButtonItem />
        </Grid>
      </Fragment>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <ButtonRow />
        <ButtonRow />
        <ButtonRow />
      </Grid>
    </div>
  );
}

export default GameContainer;

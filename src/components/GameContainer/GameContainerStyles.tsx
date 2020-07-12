import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "purple",
    width: "50rem",
    height: "50rem",
    margin: "5rem auto",
  },
  square: {
    width: "15rem",
    height: "15rem",
    backgroundColor: "aqua",
    padding: "0.5rem",
    margin: "0.3rem auto",
  },
}));

export default useStyles;

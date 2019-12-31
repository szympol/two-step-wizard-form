import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  header: {
    padding: theme.spacing(1)
  }
}));

function MasterForm() {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <h1 className={classes.header}>The two step wizard</h1>
    </Paper>
  );
}

export default MasterForm;

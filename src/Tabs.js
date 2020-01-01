import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const styles = () => ({
  root: {
    fontSize: "10px"
  }
});

class StepTabs extends React.Component {
  constructor(props) {
    super(props);
    let currentTab = props.currentStep - 1;

    this.state = {
      value: currentTab
    };
  }
  componentDidUpdate(prevProps) {
    let prevTab = prevProps.currentStep - 1;
    let currentTab = this.props.currentStep - 1;

    if (currentTab !== prevTab) {
      this.setState({
        value: currentTab
      });
    }
  }

  handleChange = () => {
    const setTab = this.state.value ? 0 : 1;
    this.setState({ value: setTab });

    setTimeout(
      () => this.props.handleChangeCurrentStepByTabs(this.state.value + 1),
      0
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Tabs
        value={this.state.value}
        indicatorColor="primary"
        textColor="primary"
        onChange={this.handleChange}
        aria-label="assets tabs"
      >
        <Tab className={classes.root} label="1. Asset information" />
        <Tab className={classes.root} label="2. Advanced" />
      </Tabs>
    );
  }
}

StepTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StepTabs);

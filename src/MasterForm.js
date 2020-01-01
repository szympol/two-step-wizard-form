import React from "react";
import PropTypes from "prop-types";
import HamburgerToggle from "react-hamburger-menu";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Step1 from "./steps/AssetInformation";
import Step2 from "./steps/Advanced";
import Tabs from "./Tabs";

const mainColor = "#5d6191";
const headerBackgroundColor = "#e9eaee";

const styles = () => ({
  root: {
    background: "white",
    minWidth: "400px",
    color: mainColor
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    background: headerBackgroundColor
  },
  title: {
    fontSize: "32px"
  },
  form: {
    padding: "16px"
  }
});

class MasterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      step1: {
        assetName: "",
        assetCode: "",
        maxIssuanceAmount: ""
      },
      step2: {
        issuanceApproval: "",
        preIssuanceAssetSignerID: "",
        initialPreIssuedAmount: ""
      },
      open: true
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    const stepNumber = event.target.attributes["step"].value;

    this.setState(prevState => {
      let step = Object.assign({}, prevState[stepNumber]);
      step[name] = value;
      return { [stepNumber]: step };
    });
  };

  handleChangeCurrentStepByTabs = currentStep => {
    this.setState({ currentStep });
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  goNext = event => {
    event.preventDefault();
    let { currentStep } = this.state;
    currentStep++;
    this.setState({ currentStep });
  };

  goPrev = event => {
    event.preventDefault();
    let { currentStep } = this.state;
    currentStep--;
    this.setState({ currentStep });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { step1, step2 } = this.state;
    const requestBody = {
      step1,
      step2
    };
    console.log(JSON.stringify(requestBody));
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.root} container direction="column" spacing={2}>
          <header className={classes.header}>
            <h1 className={classes.title}>Create asset</h1>
            <HamburgerToggle
              isOpen={this.state.open}
              menuClicked={this.handleClick}
              width={30}
              height={24}
              color={mainColor}
              animationDuration={0.5}
            />
          </header>
          <Tabs
            currentStep={this.state.currentStep}
            handleChangeCurrentStepByTabs={this.handleChangeCurrentStepByTabs}
          />
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}
            style={!this.state.open ? { display: "none" } : {}}
          >
            <Step1
              currentStep={this.state.currentStep}
              goNext={this.goNext}
              handleChange={this.handleChange}
              data={this.state.step1}
            />
            <Step2
              currentStep={this.state.currentStep}
              goPrev={this.goPrev}
              handleChange={this.handleChange}
              data={this.state.step2}
            />
            {this.state.currentStep === 2 && <button>Create request</button>}
          </form>
        </Grid>
      </React.Fragment>
    );
  }
}

MasterForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MasterForm);

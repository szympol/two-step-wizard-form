import React from "react";
import PropTypes from "prop-types";
import HamburgerToggle from "react-hamburger-menu";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm } from "react-material-ui-form-validator";

import Step1 from "./steps/AssetInformation";
import Step2 from "./steps/Advanced";
import Tabs from "./components/Tabs";

const mainColor = "#5d6191";
const headerBackgroundColor = "#e9eaee";

const styles = () => ({
  root: {
    background: "white",
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
    padding: "16px",
    "& > .MuiFormControl-root": {
      marginBottom: "10px"
    }
  },
  button: {
    display: "flex",
    marginTop: "16px",
    minWidth: "96px",
    textTransform: "capitalize"
  }
});

class MasterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      validStep1: false,
      validStep2: false,
      step1: {
        assetName: "",
        assetCode: "",
        maxIssuanceAmount: "",
        assetType: "",
        transferable: false,
        withdrawable: false
      },
      step2: {
        issuanceDisapproval: false,
        preIssuanceAssetSignerID: "",
        initialPreIssuedAmount: ""
      },
      open: true
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    const stepNumber =
      name === "assetName" ||
      name === "assetCode" ||
      name === "maxIssuanceAmount" ||
      name === "assetType"
        ? "step1"
        : "step2";

    this.setState(prevState => {
      let step = Object.assign({}, prevState[stepNumber]);
      step[name] = value;
      return { [stepNumber]: step };
    });
  };

  handleChangeEmail = event => {
    const email = event.target.value;
    this.setState({ email });
  };

  handleChangeCurrentStepByTabs = currentStep => {
    this.setState({ currentStep });
  };

  handleChangeCheckbox = name => event => {
    const checked = event.target.checked;
    this.setState(prevState => {
      let step = Object.assign({}, prevState.step1);
      step.transferable = false;
      return { step1: step };
    });
    this.setState(prevState => {
      let step = Object.assign({}, prevState.step1);
      step.withdrawable = false;
      return { step1: step };
    });
    this.setState(prevState => {
      let step = Object.assign({}, prevState.step1);
      step[name] = checked;
      return { step1: step };
    });
  };

  handleChangeCheckboxStep2 = name => event => {
    const checked = event.target.checked;
    this.setState(prevState => {
      let step = Object.assign({}, prevState.step2);
      step[name] = checked;
      return { step2: step };
    });
  };

  getRandomSignerId = id => {
    this.setState(prevState => {
      let step = Object.assign({}, prevState.step2);
      step.preIssuanceAssetSignerID = id;
      return { step2: step };
    });
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  getStateButtonStep1 = state => {
    this.setState({ validStep1: !state });
  };
  getStateButtonStep2 = state => {
    this.setState({ validStep2: !state });
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
          <main style={!this.state.open ? { display: "none" } : {}}>
            <Tabs
              currentStep={this.state.currentStep}
              handleChangeCurrentStepByTabs={this.handleChangeCurrentStepByTabs}
              validStep1={this.state.validStep1}
            />
            <ValidatorForm
              className={classes.form}
              ref={r => {
                this.form = r;
              }}
              onError={errors => console.log(errors)}
              onSubmit={() => console.log("submitted")}
              instantValidate
            >
              <Step1
                currentStep={this.state.currentStep}
                goNext={this.goNext}
                handleChange={this.handleChange}
                data={this.state.step1}
                handleChangeCheckbox={this.handleChangeCheckbox}
                getStateButtonStep1={this.getStateButtonStep1}
              />
              <Step2
                currentStep={this.state.currentStep}
                goPrev={this.goPrev}
                handleChange={this.handleChange}
                data={this.state.step2}
                handleChangeCheckbox={this.handleChangeCheckboxStep2}
                getRandomSignerId={this.getRandomSignerId}
                getStateButtonStep2={this.getStateButtonStep2}
              />
            </ValidatorForm>
            {this.state.currentStep === 2 && (
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                onClick={this.handleSubmit}
                disabled={!this.state.validStep1 || !this.state.validStep2}
              >
                Create request
              </Button>
            )}
          </main>
        </Grid>
      </React.Fragment>
    );
  }
}

MasterForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MasterForm);

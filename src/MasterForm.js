import React from "react";
import Paper from "@material-ui/core/Paper";
import Step1 from "./steps/AssetInformation";
import Step2 from "./steps/Advanced";

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
      }
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
    return (
      <React.Fragment>
        <Paper elevation={3}>
          <h1>The two step wizard</h1>
        </Paper>
        <form onSubmit={this.handleSubmit}>
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
      </React.Fragment>
    );
  }
}

export default MasterForm;

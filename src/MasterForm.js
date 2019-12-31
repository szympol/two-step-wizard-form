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
        issuanceApproval: true,
        preIssuanceAssetSignerID: null,
        initialPreIssuedAmount: null
      }
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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
        <form>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            data={this.state.step1}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            data={this.state.step2}
          />
        </form>
      </React.Fragment>
    );
  }
}

export default MasterForm;

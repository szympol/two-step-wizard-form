import React from "react";

export default class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <div>
        <input
          id="assetName"
          name="assetName"
          type="text"
          placeholder="Asset name"
          step="step1"
          value={this.props.data.assetName}
          onChange={this.props.handleChange}
        />
        <br />
        <input
          id="assetCode"
          name="assetCode"
          type="text"
          placeholder="Asset code"
          step="step1"
          value={this.props.data.assetCode}
          onChange={this.props.handleChange}
        />
        <br />
        <input
          id="maxIssuanceAmount"
          name="maxIssuanceAmount"
          type="text"
          placeholder="Max Issuance Amount"
          step="step1"
          value={this.props.data.maxIssuanceAmount}
          onChange={this.props.handleChange}
        />
        <br />
        <button onClick={this.props.goNext}>Next</button>
      </div>
    );
  }
}

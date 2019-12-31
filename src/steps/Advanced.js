import React from "react";

export default class Step2 extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <div>
        <input
          id="issuanceApproval"
          name="issuanceApproval"
          type="text"
          placeholder="Issuance Approval"
          step="step2"
          value={this.props.data.issuanceApproval}
          onChange={this.props.handleChange}
        />
        <br />
        <input
          id="preIssuanceAssetSignerID"
          name="preIssuanceAssetSignerID"
          type="text"
          placeholder="Pre Issuance Asset Signer ID"
          step="step2"
          value={this.props.data.preIssuanceAssetSignerID}
          onChange={this.props.handleChange}
        />
        <br />
        <input
          id="initialPreIssuedAmount"
          name="initialPreIssuedAmount"
          type="text"
          placeholder="Initial Pre Issued Amount"
          step="step2"
          value={this.props.data.initialPreIssuedAmount}
          onChange={this.props.handleChange}
        />
        <br />
        <button onClick={this.props.goPrev}>Previous</button>
      </div>
    );
  }
}

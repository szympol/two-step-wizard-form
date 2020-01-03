import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { TextValidator } from "react-material-ui-form-validator";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ModalPreIssuance from "../components/ModalPreIssuance";

const styles = () => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px"
  },
  generator: {
    fontSize: "12px",
    whiteSpace: "nowrap",
    marginLeft: "16px",
    fontWeight: "bold",
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  cursor: {
    cursor: "pointer"
  }
});

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      issuanceDisapprovalValid: true,
      preIssuanceAssetSignerIDValid: false,
      initialPreIssuedAmount: false,
      signerId: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      signerId,
      preIssuanceAssetSignerIDValid,
      initialPreIssuedAmount
    } = this.state;
    let { issuanceDisapproval, ...prevPropsData } = prevProps.data;
    let {
      issuanceDisapproval: issuanceDisapprovalCurrentData,
      ...currentData
    } = this.props.data;

    if (issuanceDisapproval !== issuanceDisapprovalCurrentData) {
      if (issuanceDisapprovalCurrentData) {
        this.setState({ disabled: true });
      } else {
        this.setState({ disabled: false });
      }
      this.setState({
        issuanceDisapprovalValid: !issuanceDisapprovalCurrentData
      });
      setTimeout(() => this.props.getStateButtonStep2(!this.state.disabled), 0);
    }

    const condition = preIssuanceAssetSignerIDValid && initialPreIssuedAmount;
    if (JSON.stringify(prevPropsData) !== JSON.stringify(currentData)) {
      if (condition) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
      setTimeout(() => this.props.getStateButtonStep2(this.state.disabled), 0);
    }

    if (prevState.signerId !== signerId) {
      this.props.getRandomSignerId(signerId);
    }
  }

  validatorListenerPreIssuanceAssetSignerID = result => {
    this.setState({ preIssuanceAssetSignerIDValid: result });
  };

  validatorListenerInitialPreIssuedAmount = result => {
    this.setState({ initialPreIssuedAmount: result });
  };

  generateRandomNumber = () => {
    this.setState({ signerId: Math.floor(Math.random() * 100000 + 1) });
  };

  render() {
    const { classes } = this.props;
    const {
      issuanceDisapproval,
      preIssuanceAssetSignerID,
      initialPreIssuedAmount
    } = this.props.data;
    const { issuanceDisapprovalValid } = this.state;
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <React.Fragment>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={issuanceDisapproval}
                  onChange={this.props.handleChangeCheckbox(
                    "issuanceDisapproval"
                  )}
                  value="issuanceDisapproval"
                />
              }
              label="I do not want to make additional issuance later"
            />
          </FormGroup>
        </FormControl>
        <ModalPreIssuance />
        <div className={classes.wrapper}>
          <TextValidator
            fullWidth
            label="Pre-issuance asset signer ID"
            onChange={this.props.handleChange}
            name="preIssuanceAssetSignerID"
            type="text"
            value={preIssuanceAssetSignerID}
            validators={["required", "matchRegexp:^[0-9]*$"]}
            errorMessages={["this field is required", "signer ID is not valid"]}
            validatorListener={this.validatorListenerPreIssuanceAssetSignerID}
            disabled={!issuanceDisapprovalValid}
          />
          {!issuanceDisapprovalValid && (
            <p className={classes.generator}>Use mine</p>
          )}
          {issuanceDisapprovalValid && (
            <p
              className={`${classes.generator} ${classes.cursor}`}
              onClick={this.generateRandomNumber}
            >
              Use mine
            </p>
          )}
        </div>
        <TextValidator
          fullWidth
          label="Initial pre-issued amount"
          onChange={this.props.handleChange}
          name="initialPreIssuedAmount"
          type="text"
          value={initialPreIssuedAmount}
          validators={["required", "matchRegexp:^[0-9]*$"]}
          errorMessages={[
            "this field is required",
            "initial amount is not valid"
          ]}
          validatorListener={this.validatorListenerInitialPreIssuedAmount}
          disabled={!issuanceDisapprovalValid}
        />
      </React.Fragment>
    );
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Step2);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { TextValidator } from "react-material-ui-form-validator";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = () => ({
  button: {
    display: "flex",
    marginTop: "16px",
    minWidth: "96px",
    textTransform: "capitalize"
  }
});

class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      assetNameValid: false,
      assetCodeValid: false,
      maxIssuanceAmountValid: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      assetNameValid,
      assetCodeValid,
      maxIssuanceAmountValid
    } = this.state;

    const { assetType, transferable, withdrawable } = this.props.data;

    const prevPropsData = prevProps.data;
    const currentData = this.props.data;

    const ifTransferableOrWithdrawableChecked = transferable || withdrawable;
    const condition =
      assetNameValid &&
      assetCodeValid &&
      maxIssuanceAmountValid &&
      assetType.length > 0 &&
      ifTransferableOrWithdrawableChecked;

    if (JSON.stringify(prevPropsData) !== JSON.stringify(currentData)) {
      if (condition) this.setState({ disabled: false });
      setTimeout(() => this.props.getStateButtonStep1(this.state.disabled), 0);
    }
  }

  validatorListenerAssetName = result => {
    this.setState({ assetNameValid: result });
  };

  validatorListenerAssetCode = result => {
    this.setState({ assetCodeValid: result });
  };

  validatorListenerMaxIssuanceAmount = result => {
    this.setState({ maxIssuanceAmountValid: result });
  };

  render() {
    const { classes } = this.props;
    const {
      assetName,
      assetCode,
      maxIssuanceAmount,
      assetType,
      transferable,
      withdrawable
    } = this.props.data;
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <React.Fragment>
        <TextValidator
          fullWidth
          label="Asset name"
          onChange={this.props.handleChange}
          name="assetName"
          type="text"
          value={assetName}
          validators={["required", "matchRegexp:^[a-zA-Z]+$"]}
          errorMessages={["this field is required", "asset name is not valid"]}
          validatorListener={this.validatorListenerAssetName}
        />
        <TextValidator
          fullWidth
          label="Asset code"
          onChange={this.props.handleChange}
          name="assetCode"
          type="text"
          value={assetCode}
          validators={["required", "matchRegexp:^[0-9]*$"]}
          errorMessages={["this field is required", "asset code is not valid"]}
          validatorListener={this.validatorListenerAssetCode}
        />
        <TextValidator
          fullWidth
          label="Max Issuance Amount"
          onChange={this.props.handleChange}
          name="maxIssuanceAmount"
          type="text"
          value={maxIssuanceAmount}
          validators={["required", "matchRegexp:^[0-9]*$"]}
          errorMessages={["this field is required", "Amount is not valid"]}
          validatorListener={this.validatorListenerMaxIssuanceAmount}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-error-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-error-label"
            id="demo-simple-select-error"
            name="assetType"
            value={assetType}
            onChange={this.props.handleChange}
            renderValue={value => `${value}`}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Cash and cash equivalents"}>
              Cash and cash equivalents
            </MenuItem>
            <MenuItem value={"Inventory"}>Inventory</MenuItem>
            <MenuItem value={"Investments"}>Investments</MenuItem>
            <MenuItem value={"PPE (Property, Plant, and Equipment)"}>
              PPE (Property, Plant, and Equipment)
            </MenuItem>
            <MenuItem value={"Vehicles"}>Vehicles</MenuItem>
            <MenuItem value={"Furniture"}>Furniture</MenuItem>
            <MenuItem value={"Patents (intangible asset)"}>
              Patents (intangible asset)
            </MenuItem>
            <MenuItem value={"Stock"}>Stock</MenuItem>
          </Select>
          <FormHelperText style={assetType.length ? { display: "none" } : {}}>
            Type required
          </FormHelperText>
        </FormControl>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={transferable}
                  onChange={this.props.handleChangeCheckbox("transferable")}
                  value="transferable"
                />
              }
              label="Transferable"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={withdrawable}
                  onChange={this.props.handleChangeCheckbox("withdrawable")}
                  value="withdrawable"
                />
              }
              label="Withdrawable"
            />
          </FormGroup>
          <FormHelperText>Required</FormHelperText>
        </FormControl>

        <Button
          color="primary"
          variant="contained"
          onClick={this.props.goNext}
          disabled={this.state.disabled}
          className={classes.button}
        >
          Next
        </Button>
      </React.Fragment>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Step1);

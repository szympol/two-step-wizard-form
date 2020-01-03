import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "#2238af",
    textDecoration: "underline",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "10px"
  },
  icon: {
    fontSize: "14px"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = event => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = event => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Link href="#" onClick={handleOpen} className={classes.link}>
        Learn more about pre-issuance
        <OpenInNewIcon className={classes.icon} />
      </Link>
      <Modal
        aria-labelledby="modal-Pre-Issuance"
        aria-describedby="modal-description-Pre-Issuance"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className={classes.paper.title}>Pre-Issuance</h2>
            <p className={classes.paper.text}>
              Pre-Issuance Accrued Interest means interest on an obligation that
              accrued for a period not greater than one year before its Issuance
              Date and that will be paid within one year after such Issuance
              Date.
            </p>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

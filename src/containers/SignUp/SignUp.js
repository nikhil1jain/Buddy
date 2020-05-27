import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signUpAction } from "../../store/actions";
import {
  selectSignUpError,
  selectIsSignUpSuccess,
} from "../../store/selectors";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Buddy App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const { signDataDispatch, errorMsg, isSignUpSuccess } = props;
  const classes = useStyles();

  useEffect(() => {
    if (isSignUpSuccess) {
      props.history.push("/");
    }
  });
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleValidation() {
    let formIsValid = true;
    let errorMessage = null;
    let errorCode = null;
    const atPosition = emailData.indexOf("@");
    const dotPosition = emailData.indexOf(".");

    //Name
    if (
      firstName.length < 1 ||
      firstName.length > 10 ||
      !firstName.match(/^[a-zA-Z]+$/)
    ) {
      formIsValid = false;
      errorMessage = "Please enter valid First Name";
      errorCode = "INVALID_FIRST_NAME";
    } else if (
      lastName.length < 1 ||
      firstName.length > 10 ||
      !lastName.match(/^[a-zA-Z]+$/)
    ) {
      formIsValid = false;
      errorMessage = "Please enter valid Last Name";
      errorCode = "INVALID_LAST_NAME";
    } else if (
      emailData.length < 1 ||
      atPosition < 1 ||
      dotPosition <= atPosition + 2 ||
      dotPosition === emailData.length - 1
    ) {
      formIsValid = false;
      errorMessage = "Please enter valid Email";
      errorCode = "INVALID_EMAIL";
    } else if (passwordData.length < 1 || passwordData.length > 15) {
      formIsValid = false;
      errorMessage = "Please enter valid Password";
      errorCode = "INVALID_PASSWORD";
    }

    setErrorCode(errorCode);
    setErrorMessage(errorMessage);

    return formIsValid;
  }

  const redirectToSignInButtonHandler = () => {
    props.history.push("/");
  };

  const signUpButtonClickHandler = (event) => {
    event.preventDefault();
    // props.history.push("/");
    const isValid = handleValidation();
    if (isValid) {
      const userData = {
        email: emailData,
        password: passwordData,
        firstName: firstName,
        lastName: lastName,
        isSignUp: true,
      };
      signDataDispatch(userData);
    }
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };
  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };
  const emailDataHandler = (event) => {
    setEmailData(event.target.value);
  };
  const passwordDataHandler = (event) => {
    setPasswordData(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMsg ? `Error: ${errorMsg}` : null}
        {errorMessage ? `Error: ${errorMessage}` : null}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={firstNameHandler}
                error={errorCode === "INVALID_FIRST_NAME"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={lastNameHandler}
                error={errorCode === "INVALID_LAST_NAME"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailDataHandler}
                error={errorCode === "INVALID_EMAIL"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={passwordDataHandler}
                error={errorCode === "INVALID_PASSWORD"}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signUpButtonClickHandler}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={redirectToSignInButtonHandler}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        <p>After successful Sign up, you will be redirected to Login Page.</p>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signDataDispatch: (payload) => dispatch(signUpAction(payload)),
});

const mapStateToProps = (state) => {
  return {
    errorMsg: selectSignUpError(state),
    isSignUpSuccess: selectIsSignUpSuccess(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

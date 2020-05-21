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
import { signUpAction } from "../store/actions";

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
  const { signDataDispatch, errorMessage, isSignUpSuccess } = props;
  const classes = useStyles();

  useEffect(() => {
    if (isSignUpSuccess) {
      props.history.push("/");
    }
  });
  const [error, setError] = useState(null);
  const [emailData, setEmailData] = useState(null);
  const [passwordData, setPasswordData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleValidation() {
    let formIsValid = true;

    //Name
    if (firstName === "") {
      formIsValid = false;
      setError("Name cannot be empty");
    }

    if (typeof firstName !== "string") {
      formIsValid = false;
      setError("Only Letters");
    }

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
        {errorMessage}
        {error ? `Error: ${error}` : null}
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
    errorMessage: state.signUpError,
    isSignUpSuccess: state.isSignUpSuccess,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// Base
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
// material core
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

// material icon 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


class LoginComponent extends React.Component {
  // création local references
  myEmail = React.createRef()
  myPswd = React.createRef()


  // login submition handling
  handleSubmit = (e) => {
    const { authContainer,navContainer } = this.props;
    authContainer.setLoading(true);
    e.preventDefault();
    // do request 
    const res = fetch('/api/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        login: this.myEmail.value,
        password: this.myPswd.value
      })
    }).then(function (res) {
      var status = res.status;
      if (status === 410) { // error code login or pswd incorrect
        NotificationManager.error('Le couple login/mot de passe est incorrect', 'Login incorrect', 2000);
      } else if (status === 200) {
        // format result
        res.json().then((json) => authContainer.SetAuthenticateStatus(json.token, json.role, json.name, json.id))
        navContainer.hideLoginPopup()
      } else {
        NotificationManager.error('Une erreur inconnu est survenu, veullez consulter les log pour plus de détails', 'Errueur', 2000);
      }
    })
  };

  retirection = () => {
    return null;
  }

  // render HTML
  render() {
    const { classes } = this.props;
    return (
      <div className="login-container">
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <h5>
              Connexion
          </h5>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input id="login" name="login" type="text" autoComplete="email" autoFocus inputRef={(myEmail) => this.myEmail = myEmail} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" inputRef={(myPswd) => this.myPswd = myPswd} />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Se connecter
            </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

// properties verifications
LoginComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

//CSS in JS
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Regle le problème de IE 11
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Regle le problème de IE 11
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

// component export with css style
export default withStyles(styles)(LoginComponent);
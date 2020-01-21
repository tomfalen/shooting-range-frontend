import React, { useState, useContext, Fragment } from 'react';
import authContext from '../../store';
import workerApi from './workerApi.js';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function AddWorker() {
  const [{ error, sessionId }] = useContext(authContext);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    FirstName: '',
    LastName: '',
    Pesel: '',
    Birthday: '',
    Phone: '',
    Employed: '',
    Email: ''
  });
  function onChange(event) {
    const { name, value } = event.target;
    console.log(sessionId)

    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  }


  const [selectedBirthDate, setSelectedBirthDate] = React.useState(new Date());

  const onBirthDateChange = date => {
    setSelectedBirthDate(date);
  };

  const [selectedEmployedDate, setSelectedEmployedDate] = React.useState(new Date());

  const onEmployedDateChange = date => {
    setSelectedEmployedDate(date);
  };


  function onSubmit(event) {
    event.preventDefault();
    workerApi.addWorker(formData, sessionId, selectedBirthDate, selectedEmployedDate)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div>
      <Fragment>
        {error && <p className="error">{error}</p>}
        <form onSubmit={onSubmit}>
        <Container component="main" maxWidth="300px" >

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container xs="12" >
              <Grid container item xs="4" >
              <Grid item xs="6" alignContent="right" alignItems="right">
                <TextField
                  required
                  id="outlined-required"
                  label="username"
                  name="username"
                  variant="outlined"
                  fullWidth
                  value={formData.username}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="12">
                <TextField
                  required
                  id="outlined-required"
                  label="Email"
                  name="Email"
                  variant="outlined"
                  value={formData.Email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="12">
                <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={onChange}
                  variant="outlined"
                />
              </Grid>
              </Grid>
              <Grid container xs="4">
              <Grid xs="12">
                <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  name="FirstName"
                  variant="outlined"
                  value={formData.FirstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid xs="12">
                <TextField
                  required
                  id="outlined-required"
                  label="Pesel"
                  name="Pesel"
                  variant="outlined"
                  value={formData.Pesel}
                  onChange={onChange}
                />
              </Grid>
              <Grid xs="12">
                <TextField
                  required
                  id="outlined-required"
                  label="Last name"
                  name="LastName"
                  variant="outlined"
                  value={formData.LastName}
                  onChange={onChange}
                />
              </Grid>
              </Grid>
              <Grid container xs="4">
              <Grid xs="12">
                <TextField
                  required
                  id="outlined-required"
                  label="Phone"
                  name="Phone"
                  variant="outlined"
                  value={formData.Phone}
                  onChange={onChange}
                />
              </Grid>
              <Grid xs="12">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  name="BirthDay"
                  label="Birthday"
                  format="dd/MM/yyyy"
                  value={selectedBirthDate}
                  onChange={onBirthDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid xs="12">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  name="Employed"
                  label="Date picker dialog"
                  format="dd/MM/yyyy"
                  value={selectedEmployedDate}
                  onChange={onEmployedDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            type="submit"
          >
            Save
      </Button>
      </Container>

        </form>
      </Fragment>
    </div>
  );
}
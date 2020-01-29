import React, { useState, useContext, Fragment } from 'react';
import authContext from '../../store';
import workerApi from './workerApi.js';

import Typography from '@material-ui/core/Typography';
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

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  workerComp: {
    marginBottom: 50,
    background: 'white'
  },
  gridContainer: {
    marginBottom: 50,
    background: 'white'
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
      <Fragment >
        <form onSubmit={onSubmit} className={classes.workerComp}>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Typography component="h1" variant="h5">
              Dodaj pracownika
              </Typography>
            <Grid container xs="12" className={classes.gridContainer} spacing="3">
              <Grid item xs="4" >
                <TextField
                  required
                  id="outlined-required"
                  label="Nazwa użytkownika"
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  required
                  id="outlined-required"
                  label="Adres e-mail"
                  name="Email"
                  value={formData.Email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  required
                  id="outlined-password-input"
                  label="Hasło"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  required
                  id="outlined-required"
                  label="Imię"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  required
                  id="outlined-required"
                  label="Pesel"
                  name="Pesel"
                  value={formData.Pesel}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  required
                  id="outlined-required"
                  label="Nazwisko"
                  name="LastName"
                  value={formData.LastName}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  required
                  id="outlined-required"
                  label="Telefon"
                  name="Phone"
                  value={formData.Phone}
                  onChange={onChange}
                />
              </Grid>
              <Grid  xs="4">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  name="BirthDay"
                  label="Urodziny"
                  format="dd/MM/yyyy"
                  value={selectedBirthDate}
                  onChange={onBirthDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid  xs="4">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  name="Employed"
                  label="Zatrudniony"
                  format="dd/MM/yyyy"
                  value={selectedEmployedDate}
                  onChange={onEmployedDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </Grid>

            <Grid container xs='12' spacing="4">
              <Grid item xs='4'>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                  type="submit"
                  fullWidth
                >
                  Dodaj
                   </Button>
              </Grid>
            </Grid>

          </MuiPickersUtilsProvider>
        </form>
      </Fragment>
    </div>
  );
}
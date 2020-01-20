import React, { useState, useContext, useEffect, Fragment } from 'react';
import Axios from 'axios';
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
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function AddWorker() {
  const [{ error, sessionId }, dispatch] = useContext(authContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
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
    console.log(name)

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
    setLoading(true);
    console.log(selectedEmployedDate);
    console.log(selectedBirthDate);
    var dd = String(selectedBirthDate.getDate()).padStart(2, '0');
    var mm = String(selectedBirthDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = selectedBirthDate.getFullYear();

    var birth = yyyy + '-' + mm + '-' + dd;

    dd = String(selectedEmployedDate.getDate()).padStart(2, '0');
    mm = String(selectedEmployedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = selectedEmployedDate.getFullYear();
    var employed = yyyy + '-' + mm + '-' + dd;
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <TextField
                required
                id="outlined-required"
                label="username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={onChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                name="Email"
                variant="outlined"
                value={formData.Email}
                onChange={onChange}
              />
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
              <TextField
                required
                id="outlined-required"
                label="First Name"
                name="FirstName"
                variant="outlined"
                value={formData.FirstName}
                onChange={onChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Pesel"
                name="Pesel"
                variant="outlined"
                value={formData.Pesel}
                onChange={onChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Last name"
                name="LastName"
                variant="outlined"
                value={formData.LastName}
                onChange={onChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone"
                name="Phone"
                variant="outlined"
                value={formData.Phone}
                onChange={onChange}
              />
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
        </form>
      </Fragment>
    </div>
  );
}
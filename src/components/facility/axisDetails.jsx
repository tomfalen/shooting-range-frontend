import React, { useState, useContext, Fragment } from 'react';
import authContext from '../../store';
import facilityApi from './facilityApi.js';

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

export default function AxisDetails(props) {
  const [{ error, sessionId }] = useContext(authContext);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    number: ''
  });
  function onChange(event) {
    const { name, value } = event.target;
    console.log(sessionId)

    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  }


  function onSubmit(event) {
    event.preventDefault();
    formData.axisId = props.value;
    facilityApi.addField(formData, sessionId, props.value)
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
              Add new field
              </Typography>
            <Grid container xs="12" className={classes.gridContainer} spacing="3">
              <Grid item xs="4" >
                <TextField
                  required
                  id="outlined-required"
                  label="name"
                  name="name"
                  value={formData.username}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs="4">
                <TextField
                  required
                  id="outlined-required"
                  label="number"
                  name="number"
                  value={formData.Email}
                  onChange={onChange}
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
                  Save
                   </Button>
              </Grid>
            </Grid>

          </MuiPickersUtilsProvider>
        </form>
      </Fragment>
    </div>
  );
}
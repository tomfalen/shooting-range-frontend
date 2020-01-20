import React, { useState, useContext, useEffect, Fragment } from 'react';
import Axios from 'axios';
import authContext from '../../store';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
}));

export default function WorkerDetails(props) {
  const [{ isLoggedIn, error, sessionId }, dispatch] = useContext(authContext);
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
    console.log(formData);
    console.log(selectedEmployedDate);
    console.log(selectedBirthDate);
    var dd = String(selectedBirthDate.getDate()).padStart(2, '0');
    var mm = String(selectedBirthDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = selectedBirthDate.getFullYear();

    var birth = yyyy + mm +  dd;

    dd = String(selectedEmployedDate.getDate()).padStart(2, '0');
    mm = String(selectedEmployedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = selectedEmployedDate.getFullYear();
    var employed = yyyy + mm + dd;


        Axios.put("http://sokres.ddns.net:50101/absence/" + props.value + "/" + birth + "/" + employed, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": sessionId
              }
      })
      .then((response) => {
      console.log(response)
      })
      .catch((error) => {
      console.log(error)
      })
  }
  const [state, setState] = useState({
    selectedDays: []
  });

  // function handleDayClick(day, { selected }) {
  //   const { selectedDays } = state;
  //   if (selected) {
  //     const selectedIndex = selectedDays.findIndex(selectedDay =>
  //       DateUtils.isSameDay(selectedDay, day)
  //     );
  //     selectedDays.splice(selectedIndex, 1);
  //   } else {
  //     selectedDays.push(day);
  //   }
  //   setState({ selectedDays });
  // }

  useEffect(() => {
    Axios.get("http://sokres.ddns.net:50101/worker/current/absences",
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": sessionId
        }
      })
      .then((response) => {
        var len = response.data.length; 
        const { selectedDays } = state;
        var concatedDays = [];
        for (var i = 0; i < len; i++) {

          var days = GetDays(response.data[i].TimeFrom, response.data[i].TimeTo);
          concatedDays = concatedDays.concat(days);
        }
        setState({ selectedDays: concatedDays });
      })
      .catch((error) => {
      })
  }, []);

  function GetDays(startDate, endDate) {

    var retVal = [];
    var current = new Date(startDate);
    var end = new Date(endDate);
    while (current <= end) {

     retVal.push(new Date(current));

     current.setDate(current.getDate() + 1);

    }
   
    return retVal;
   
   }

  return (
    <div>
      <DayPicker
        selectedDays={state.selectedDays}
      />
      <Fragment>
        {error && <p className="error">{error}</p>}
        <form onSubmit={onSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                name="BirthDay"
                label="Birthday"
                format="yyyy/MM/dd"
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
                format="yyyy/MM/dd"
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
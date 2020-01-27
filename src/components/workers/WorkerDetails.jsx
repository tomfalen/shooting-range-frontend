import React, { useState, useContext, useEffect, Fragment } from 'react';
import Axios from 'axios';
import authContext from '../../store';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MaterialTable from 'material-table';
import workerApi from './workerApi';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Container from '@material-ui/core/Container';

import 'date-fns';

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
  const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const [columns] = useState({
    columns: [
      { title: 'ID', field: 'Id', editable: 'never', hidden: 'true' },
      { title: 'Time from', field: 'TimeFrom', editable: 'always', type: 'date' },
      { title: 'Time to', field: 'TimeTo', editable: 'always', type: 'date' },
    ],
  });

  const [data, setData] = useState({
    data: []
  });

  function onSubmit(event) {
    event.preventDefault();
    var dd = String(selectedBirthDate.getDate()).padStart(2, '0');
    var mm = String(selectedBirthDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = selectedBirthDate.getFullYear();

    var birth = yyyy + mm + dd;

    dd = String(selectedEmployedDate.getDate()).padStart(2, '0');
    mm = String(selectedEmployedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = selectedEmployedDate.getFullYear();
    var employed = yyyy + mm + dd;

    Axios.put("http://sokres.ddns.net:50101/worker/absence/" + props.value + "/" + birth + "/" + employed, {
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

  const addRequest = (data) => {
    workerApi.addAbsence(data, sessionId, props.value)
      .then((response) => {
      })
      .catch((error) => {
      })
  }

  const deleteRequest = (data) => {
    workerApi.deleteAbsence(data, sessionId, props.value)
      .then((response) => {
        console.log(response.status)
      })
      .catch((error) => {
        console.log(error)
      })
  };
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
    Axios.get("http://sokres.ddns.net:50101/worker/absences/" + props.value,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": sessionId
        }
      })
      .then((response) => {
        setData({ data: response.data });
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
  const modifiersStyles = {
    selected: {
      color: 'white',
      backgroundColor: '#388e3c',
    }
  };
  return (
    <div>
    <Container component="main" maxWidth="300px" >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DayPicker
            selectedDays={state.selectedDays}
            modifiersStyles={modifiersStyles}
          />
        </Grid>
        <Grid item xs={10}>
          <Fragment>
            <MaterialTable
              title="Absences"
              columns={columns.columns}
              icons={tableIcons}
              data={data.data}
              options={{
                search: false,
              }}
              editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                  addRequest(newData);
                  setData(prevState => {
                    const data = [...prevState.data];
                    console.log(data);

                    data.push(newData);
                    return { ...prevState, data };
                  });
                  resolve();
                }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    resolve();
                    deleteRequest(oldData.Id);
                    setData(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }),
              }}
            />
          </Fragment>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}
import React, { useState, useContext } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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
import authContext from '../../store';
import reservationApi from './reservationsApi';
import Grid from '@material-ui/core/Grid';

export default function ReservationsManager() {
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
            { title: 'Id', field: 'Id', editable: 'never', hidden: 'true' },
            { title: 'Czas ropoczęcia', field: 'BeginTime', type: 'date' },
            { title: 'Czas zakończenia', field: 'EndTime', type: 'date' },
            { title: 'Czas utworzenia', field: 'CreationTime', type: 'date' },
            { title: 'Czas modyfikacji', field: 'ModificationTime', type: 'date' },
            { title: 'Tor', field: 'Position' },
            { title: 'Opiekun', field: 'Perceptor' },
            { title: 'Status', field: 'Status' },
        ],
    });
    const [{ sessionId }] = useContext(authContext);
    const [formData, setFormData] = useState({
        orderId: '',
        workerId: '',
        clientId: '',
        axisId: '',
    });

    const [data, setData] = useState({
        data: []
    });
    const useStyles = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        gridContainer: {
            background: 'white'
          },
    }));
    const classes = useStyles();

    function onChange(event) {
        const { name, value } = event.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
    }
    const getOrders = () => {
        reservationApi.getReservation(formData.orderId, sessionId)
            .then((response) => {
                setData({ data: [response.data] });
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getOrdersByWorker = () => {
        reservationApi.getReservationForWorker(formData.workerId, sessionId)
            .then((response) => {
                setData({ data: response.data });
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getOrdersByClient = () => {
        reservationApi.getReservationForClient(formData.clientId, sessionId)
            .then((response) => {
                setData({ data: response.data });
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getOrdersByAxis = () => {
        reservationApi.getReservationForAxis(formData.axisId, sessionId)
            .then((response) => {
                setData({ data: response.data });
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const reservationStarted = (data) => {
        alert("Rozpoczęcie strzelania " + data)
    }

    const reservationEnded = (data) => {
        alert("Zakonczenie strzelania " + data)
    }

    const reservationCancel = (data) => {
        alert("Anulowanie strzelania " + data)
    }

    return (
        <div class="workerList">
            <Grid container xs="12" className={classes.gridContainer} spacing="3">
                <Grid item xs="3" >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="orderId"
                        label="Id rezerwacji"
                        type="number"
                        id="order"
                        value={formData.orderId}
                        onChange={onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={getOrders}
                    >
                        Wyszukaj
								</Button>
                </Grid>
                <Grid item xs="3" >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="workerId"
                        label="Id pracownika"
                        type="number"
                        id="order"
                        value={formData.workerId}
                        onChange={onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={getOrdersByWorker}
                    >
                        Wyszukaj
								</Button>
                </Grid>
                <Grid item xs="3" >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="clientId"
                        label="Id klienta"
                        type="number"
                        id="order"
                        value={formData.clientId}
                        onChange={onChange}
                        onClick={getOrdersByClient}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Wyszukaj
								</Button>
                </Grid>
                <Grid item xs="3" >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="axisId"
                        label="Id osi"
                        type="number"
                        id="order"
                        value={formData.axisId}
                        onChange={onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={getOrdersByAxis}
                    >
                        Wyszukaj
								</Button>
                </Grid>
            </Grid>
            <div class="">
                <MaterialTable
                    title="Rezerwacje"
                    columns={columns.columns}
                    icons={tableIcons}
                    data={data.data}
                    actions={[
                        {
                          icon: () => <ArrowUpward></ArrowUpward>,
                          tooltip: 'Start firing',
                          onClick: (event, rowData) => reservationStarted(rowData.Id)
                        },
                        {
                          icon: 'SaveAlt',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => reservationStarted(rowData.Id)
                        },
                        {
                          icon: 'SaveAlt',
                          tooltip: 'Save User',
                          onClick: (event, rowData) => reservationStarted(rowData.Id)
                        }
                      ]}
                />
            </div>
        </div>
    );
}
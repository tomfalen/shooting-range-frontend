import React, { useState, useContext, useEffect, Fragment } from 'react';
import MaterialTable from 'material-table';

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
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import accountApi from './accountApi';

export default function WorkerManager() {
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
            { title: 'Begin Time', field: 'BeginTime', type: 'date', editable: 'never' },
            { title: 'End Time', field: 'EndTime', type: 'date', editable: 'never' },
            { title: 'Creation Time', field: 'CreationTime', type: 'date', editable: 'never' },
            { title: 'Modification Time', field: 'ModificationTime', type: 'date', editable: 'never' },
            { title: 'Position', field: 'Position', editable: 'never' },
            { title: 'Perceptor', field: 'Perceptor', editable: 'never' },
            { title: 'Status', field: 'Status', editable: 'never' },
        ],
    });
    const [{ sessionId }] = useContext(authContext);

    const [data, setData] = useState({
        data: []
    });
    const [formData, setFormData] = useState({
        Id: '',
        FirstName: '',
        LastName: '',
        Pesel: '',
        Birthday: '',
        Phone: '',
        EmployeeFrom: '',
        EmployeeTo: '',
        Username: '',
        Email: ''
    });
    const [{ isLoggedIn }, dispatch] = useContext(authContext);
    const useStyles = makeStyles(theme => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

      useEffect(() => {
        accountApi.getSelfData(sessionId).then((response) => {
            setFormData(response.data);
            console.log(response.data);
            console.log(formData)
        })
          .catch((error) => {
            console.log(error)
          })


      }, []);



    const classes = useStyles();
    return (
        <div>
            <Fragment>
                <Container component="main" maxWidth="300px" >
                    <CssBaseline />
                    <div className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Grid item xs={12}>
                                        <Avatar className={classes.avatar}>
                                            <AccountCircleIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                            Account information
                                </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="FirstName"
                                            value={formData.FirstName}
                                            fullWidth
                                            id="standard-basic"
                                            label="First Name"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="standard-basic"
                                            label="Last Name"
                                            name="LastName"
                                            value={formData.LastName}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="standard-basic"
                                            name="username"
                                            value={formData.Username}
                                            label="Username"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="Email"
                                            label="Email"
                                            value={formData.Email}
                                            id="standard-basic"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="Phone"
                                            value={formData.Phone}
                                            label="Phone"
                                            fullWidth
                                            id="standard-basic"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="standard-basic"
                                            name="Birthday"
                                            value={formData.Birthday}
                                            label="Birthday"
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            name="EmployeeFrom"
                                            value={formData.EmployeeFrom}
                                            label="Employeed"
                                            id="standard-basic"
                                            disabled
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                    <MaterialTable
                                        title="Your reservations"
                                        columns={columns.columns}
                                        icons={tableIcons}
                                        data={data.data}
                                        options={{
                                            search: false
                                        }}
                                    />
                                </Grid>
                            </Grid>
                    </div>
                </Container>
            </Fragment>
        </div>

    );
}
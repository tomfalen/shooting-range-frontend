import React, {forwardRef, useContext, useState} from "react";
import api from "./api";
import authContext from "../../store";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MaterialTable from "material-table";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

export default function ClientManager() {
    const [{ sessionId }] = useContext(authContext);
    const [clients, setClients] = useState({
        data: []
    });
    const [searchClientFormData, setSearchClientFormData] = useState({
        LastName: '',
        GunPermissionNumber: '',
        PerceptorIdentityNumber: '',
        Email: ''
    });
    const [clientColumns] = useState({
        columns: [
            { title: 'FirstName', field: 'FirstName', editable: 'never' },
            { title: 'LastName', field: 'LastName', editable: 'never' },
            { title: 'GunPermissionNumber', field: 'GunPermissionNumber', editable: 'never' },
            { title: 'GunPermissionPublisher', field: 'GunPermissionPublisher', editable: 'never' },
            { title: 'PerceptorIdentityNumber', field: 'PerceptorIdentityNumber', editable: 'never' },
            { title: 'PerceptorIdentityPublisher', field: 'PerceptorIdentityPublisher', editable: 'never' },
            { title: 'Username', field: 'Username', editable: 'never' },
            { title: 'Email', field: 'Email', editable: 'never' },
            { title: 'AcceptedRegulationsId', field: 'AcceptedRegulationsId', editable: 'never' },
        ],
    });
    const tableIcons = {
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    };

    function SearchClientFormSubmit(event) {
        event.preventDefault();
        api.searchClients(sessionId, searchClientFormData)
            .then((response) => {
                setClients({data: response.data})
            }).catch((error) => {
            console.log(error)
        });
    }

    function ChangeSearchClientData(event) {
        const {name, value} = event.target;
        setSearchClientFormData((searchClientFormData) => ({
                ...searchClientFormData,
                [name]: value
            })
        );
    }

    const useStyles = makeStyles(theme => ({
        root: {
            padding: '20px',
            color: 'black',
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Paper elevation={3} className={classes.root}>
                <form onSubmit={SearchClientFormSubmit}>
                    <Grid container justify="center" spacing={3} xs={12}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="LastName"
                                value={searchClientFormData.LastName}
                                onChange={ChangeSearchClientData}
                            />
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="Email"
                                value={searchClientFormData.Email}
                                onChange={ChangeSearchClientData}
                            />
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Gun Permission Number"
                                name="GunPermissionNumber"
                                value={searchClientFormData.GunPermissionNumber}
                                onChange={ChangeSearchClientData}
                            />
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Perceptor Identity Number"
                                name="PerceptorIdentityNumber"
                                value={searchClientFormData.PerceptorIdentityNumber}
                                onChange={ChangeSearchClientData}
                            />
                        </Grid>
                        <br />
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SearchOutlinedIcon />}
                                type="submit"
                                fullWidth
                            >
                                Search clients
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <MaterialTable
                                title='Clients'
                                columns={clientColumns.columns}
                                icons={tableIcons}
                                data={clients.data}
                                options={{
                                    search: true
                                }}
                            />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}
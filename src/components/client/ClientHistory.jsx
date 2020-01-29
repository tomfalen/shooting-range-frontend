import React, {forwardRef, useContext, useState} from "react";
import api from ".//api";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import authContext from "../../store";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

export default function ClientHistory() {
    const [{ sessionId }] = useContext(authContext);
    const [historyClientFormData, setHistoryClientFormData] = useState({
        From: '2020-01-01',
        To: new Date()
    });
    const [historyData, setHistoryData] = useState({
        data: []
    });
    const [historyColumns] = useState({
        columns: [
            { title: 'ID', field: 'Id', editable: 'never', hidden: true },
            { title: 'Czas rozpoczęcia', field: 'BeginTime', type: 'date', editable: 'never' },
            { title: 'Czas zakończenia', field: 'EndTime', type: 'date', editable: 'never' },
            { title: 'Czas utworzenia', field: 'CreationTime', type: 'date', editable: 'never' },
            { title: 'Czas modyfikacji', field: 'ModificationTime', type: 'date', editable: 'never' },
            { title: 'Tor', field: 'Position', editable: 'never' },
            { title: 'Opiekun', field: 'Perceptor', editable: 'never' },
            { title: 'Status', field: 'Status', editable: 'never' },
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

    const ChangeHistoryFromDate = date => {
        setHistoryClientFormData((historyClientFormData) => ({
                ...historyClientFormData,
                From: date
            })
        );
    };

    const ChangeHistoryToDate = date => {
        setHistoryClientFormData((historyClientFormData) => ({
                ...historyClientFormData,
                To: date
            })
        );
    };

    function ClientHistoryOnFormSubmit(event) {
        event.preventDefault();
        api.getHistory(sessionId, historyClientFormData)
            .then((response) => {
                setHistoryData({data: response.data});
            }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <Typography variant="h4" align="center">
                Historia
            </Typography>
            <hr />
            <br />
            <form onSubmit={ClientHistoryOnFormSubmit}>
                <Grid container justify="center" spacing={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item lg={4} sm={6} xs={12}>
                            <KeyboardDatePicker
                                fullWidth
                                label="Od"
                                name="From"
                                value={historyClientFormData.From}
                                onChange={ChangeHistoryFromDate}
                                format="yyyy/MM/dd"
                            />
                        </Grid>
                        <Grid item lg={4} sm={6} xs={12}>
                            <KeyboardDatePicker
                                fullWidth
                                label="Do"
                                name="To"
                                value={historyClientFormData.To}
                                onChange={ChangeHistoryToDate}
                                minDate={new Date()}
                                format="yyyy/MM/dd"
                                showTodayButton
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <br />
                    <Grid item lg={8} sm={12} xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SearchOutlinedIcon />}
                            type="submit"
                            fullWidth
                        >
                            Pokaż historię
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <br />
            <br />
            <MaterialTable
                title='Historia'
                columns={historyColumns.columns}
                icons={tableIcons}
                data={historyData.data}
                options={{
                    search: true
                }}
            />
        </div>
    )
}
import React, {forwardRef, useContext, useEffect, useState} from "react";
import api from "./api";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import XMLToReact from "@condenast/xml-to-react";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

export default function GlobalInformation() {
    const [openHours, setOpenHours] = useState({
        data: ''
    });
    const [openDayFormData, setOpenDayFormData] = useState({
        Day: new Date(),
    });
    const [isOpen, setIsOpen] = useState({
        isOpen: true
    });
    const [holidays, setHolidays] = useState({
        data: []
    });
    const [holidaysColumns] = useState({
        columns: [
            { title: 'Id', field: 'Id', editable: 'never', hidden: true },
            { title: 'From', field: 'From', type: 'date', editable: 'never' },
            { title: 'To', field: 'To', type: 'date', editable: 'never' },
            { title: 'Reason', field: 'Reason', editable: 'never' },
        ],
    });
    const tableIcons = {
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    };

    useEffect(() => {
        GetObjectOpenHours();
        GetObjectHolidays();
        GetIsOpenObject(openDayFormData.Day);
    }, []);

    function GetObjectOpenHours() {
        api.getObjectOpenHours()
            .then((response) => {
                setOpenHours({ data: response.data.substr(response.data.indexOf('<Days>'), response.data.indexOf('</Days>')) });
            }).catch((error) => {
            console.log(error)
        })
    }

    function GetObjectHolidays() {
        api.getObjectHolidays()
            .then((response) => {
                setHolidays({ data: response.data });
            }).catch((error) => {
            console.log(error)
        })
    }

    const ChangeOpenDayFromDate = date => {
        setOpenDayFormData((openDayFormData) => ({
                ...openDayFormData,
                Day: date
            })
        );
        GetIsOpenObject(date);
    };

    function GetIsOpenObject(date) {
        api.getIsOpenObject(date)
            .then((response) => {
                setIsOpen({isOpen: response.data});
            }).catch((error) => {
            console.log(error);
        })
    }

    const xmlToReact = new XMLToReact({
        Days: (attrs) => ({ type: DaysTag, props: attrs }),
        Day: (attrs) => ({ type: DayTag, props: attrs }),
        DayOfWeek: (attrs) => ({ type: DayOfWeekTag, props: attrs }),
        Open: (attrs) => ({ type: OpenTag, props: attrs }),
        Close: (attrs) => ({ type: CloseTag, props: attrs }),
        Hour: (attrs) => ({ type: HourTag, props: attrs }),
        Minute: (attrs) => ({ type: MinuteTag, props: attrs }),
    });

    const openHoursList = xmlToReact.convert(
        openHours.data
    );

    function DaysTag({children}) {
        return <div>{children}</div>;
    }

    function DayTag({children}) {
        return <span>{children}<br /></span>;
    }

    function DayOfWeekTag({children}) {
        return <span><br /><b>{children}</b><br /></span>;
    }

    function OpenTag({children}) {
        return <span>Open: {children}</span>;
    }

    function CloseTag({children}) {
        return <span><br />Close:{children}</span>;
    }

    function HourTag({children}) {
        return <span>{children} :</span>;
    }

    function MinuteTag({children}) {
        if (children.length < 2) {
            children = '0' + children;
        }
        return <span>{children}</span>;
    }

    const useStyles = makeStyles(theme => ({
        root: {
            padding: '20px',
            color: 'black',
        },
    }));

    const ValidationTextField = withStyles({
        root: {
            '& input:valid + fieldset': {
                borderColor: 'green',
                borderWidth: 2,
            },
        },
    })(TextField);

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h4" align="center">
                Dashboard
            </Typography>
            <hr />
            <br />
            <Grid justify="center" container spacing={1}>
                <Grid item md={4} sm={12} xs={12}>
                    <Paper elevation={3} className={classes.root}>
                        <Typography align="center" variant="h6">
                            Open hours
                        </Typography>
                        <div align="center">
                            {openHoursList}
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                    <MaterialTable
                        title='Holidays'
                        columns={holidaysColumns.columns}
                        icons={tableIcons}
                        data={holidays.data}
                        options={{
                            search: false
                        }}
                    />
                    <Paper elevation={3} className={classes.root}>
                            <Grid container justify="center" spacing={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            Check is object open
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <KeyboardDatePicker
                                            fullWidth
                                            label="Day"
                                            name="Day"
                                            value={openDayFormData.Day}
                                            onChange={ChangeOpenDayFromDate}
                                            format="yyyy/MM/dd"
                                            showTodayButton
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <Grid item xs={12}>
                                    {isOpen.isOpen ? (
                                        <ValidationTextField
                                            className={classes.margin}
                                            fullWidth
                                            label="Open"
                                            variant="outlined"
                                            value="On these day object is open"
                                        />
                                    ) : (
                                        <TextField
                                            fullWidth
                                            error
                                            label="Close"
                                            value="On these day object is closed"
                                            variant="outlined"
                                        />
                                    )}
                                </Grid>
                            </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
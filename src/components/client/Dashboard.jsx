import React, {useContext, useEffect, useState} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import authContext from "../../store";
import api from ".//api";
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import makeStyles from "@material-ui/core/styles/makeStyles";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";
import HistoryTwoToneIcon from "@material-ui/icons/HistoryTwoTone";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ClientShow from "./ClientShow";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import ClientEdit from "./ClientEdit";
import ClientReservations from "./ClientReservations";
import ClientAddReservation from "./ClientAddReservation";
import ClientHistory from "./ClientHistory";
import ClientRegulations from "./ClientRegulations";
import GlobalInformation from "./GlobalInformation";
import ChangePassword from "./ChangePassword";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const [{ sessionId }] = useContext(authContext);
    const classes = useStyles();
    const [selectItem, setSelectItem] = useState(
        'DASHBOARD'
    );
    const [clientData, setClientData] = useState({
        data: []
    });

    useEffect(() => {
        GetClientInformations();
    },[]);

    function GetClientInformations() {
        api.getAccountInfo(sessionId)
            .then((response) => {
                setClientData({ data: response.data });
            }).catch((error) => {
            console.log(error)
        })
    }

    const setDashboardActive = () => {
        setSelectItem('DASHBOARD');
    };
    const setAccountActive = () => {
        setSelectItem('ACCOUNT');
    };
    const setEditActive = () => {
        setSelectItem('EDIT');
    };
    const setReservationsActive = () => {
        setSelectItem('RESERVATIONS');
    };
    const setAddReservationActive = () => {
        setSelectItem('ADD_RESERVATION');
    };
    const setHistoryActive = () => {
        setSelectItem('HISTORY');
    };
    const setRegulationsActive = () => {
        setSelectItem('REGULATIONS');
    };
    const setChangePasswordActive = () => {
        setSelectItem('CHANGE_PASSWORD');
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper),
                }}
            >
                <Divider />
                <ListItem>
                    <ListItemIcon>
                        <AccountCircleTwoToneIcon fontSize="large" style={{ color: "black" }}/>
                    </ListItemIcon>
                    <ListItemText primary={clientData.data.FirstName} secondary={clientData.data.LastName} />
                </ListItem>
                <Divider />
                <ListItem button onClick={setDashboardActive}>
                    <ListItemIcon>
                        <DashboardOutlinedIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={setAccountActive}>
                    <ListItemIcon>
                        <PermIdentityOutlinedIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Konto" />
                </ListItem>
                <ListItem button onClick={setReservationsActive}>
                    <ListItemIcon>
                        <DateRangeOutlinedIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Rezerwacje" />
                </ListItem>
                <ListItem button onClick={setAddReservationActive}>
                    <ListItemIcon>
                        <AddTwoToneIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Dodaj rezerwację" />
                </ListItem>
                <ListItem button onClick={setHistoryActive}>
                    <ListItemIcon>
                        <HistoryTwoToneIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Historia" />
                </ListItem>
                <ListItem button onClick={setRegulationsActive}>
                    <ListItemIcon>
                        <InfoOutlinedIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Regulamin" />
                </ListItem>
                <Divider />
                <ListItem button onClick={setEditActive}>
                    <ListItemIcon>
                        <EditOutlinedIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Edycja konta" />
                </ListItem>
                <ListItem button onClick={setChangePasswordActive}>
                    <ListItemIcon>
                        <VpnKeyOutlinedIcon style={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Zmiana hasła" />
                </ListItem>
            </Drawer>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    {
                        selectItem === 'ACCOUNT' ? (
                            <ClientShow/>
                        ) : (selectItem === 'EDIT' ? (
                            <ClientEdit/>
                        ) : (selectItem === 'RESERVATIONS' ? (
                            <ClientReservations/>
                        ) : (selectItem === 'ADD_RESERVATION' ? (
                            <ClientAddReservation/>
                        ) : (selectItem === 'HISTORY' ? (
                            <ClientHistory/>
                        ) : (selectItem === 'REGULATIONS' ? (
                            <ClientRegulations/>
                        ) : (selectItem === 'CHANGE_PASSWORD' ? (
                            <ChangePassword/>
                        ) : (
                            <GlobalInformation/>
                        )
                        )
                        )
                        )
                        )
                        )
                        )
                    }
                </Container>
            </main>
        </div>
    );
}
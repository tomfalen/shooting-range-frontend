import React, {forwardRef, useContext, useEffect, useState} from "react";
import authContext from "../../store";
import api from ".//api";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

export default function ClientReservations() {
    const [{ sessionId }] = useContext(authContext);
    const [reservationData, setReservationData] = useState({
        data: [
            {
                Id: '1'
            },
            {
                Id: '2'
            }
        ]
    });
    const [reservationColumns] = useState({
        columns: [
            { title: 'Id', field: 'Id', editable: 'never' },
            { title: 'Begin Time', field: 'BeginTime', type: 'date', editable: 'never' },
            { title: 'End Time', field: 'EndTime', type: 'date', editable: 'never' },
            { title: 'Creation Time', field: 'CreationTime', type: 'date', editable: 'never' },
            { title: 'Modification Time', field: 'ModificationTime', type: 'date', editable: 'never' },
            { title: 'Position', field: 'Position', editable: 'never' },
            { title: 'Perceptor', field: 'Perceptor', editable: 'never' },
            { title: 'Status', field: 'Status', editable: 'never' },
        ],
    });
    const tableIcons = {
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    };

    useEffect(() => {
        GetClientReservations();
    }, []);

    function GetClientReservations() {
        api.getReservations(sessionId)
            .then((response) => {
                setReservationData({data: response.data});
            }).catch((error) => {
            console.log(error);
        })
    }

    function DeleteReservation(id) {
        api.deleteReservation(sessionId, id)
            .then((response) => {

            }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <Typography variant="h4" align="center">
                Your reservations
            </Typography>
            <hr />
            <br />
            <MaterialTable
                title='Reservations'
                columns={reservationColumns.columns}
                icons={tableIcons}
                data={reservationData.data}
                options={{
                    search: true
                }}
                editable={{
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            resolve();
                            DeleteReservation(oldData.Id);
                            setReservationData(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }),
                }}
            />
        </div>
    )

}
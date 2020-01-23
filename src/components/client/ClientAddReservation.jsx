import React, {useContext, useState} from "react";
import authContext from "../../store";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography"
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import api from ".//api";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function ClientAddReservation() {
    const [{ sessionId }] = useContext(authContext);
    const [addReservationFormData, setAddReservationFormData] = useState({
        Begin: new Date(),
        Duration: 0,
        Rimfire: false,
        Centerfire: false,
        Shell: false,
        Distance: 0
    });

    function AddReservationOnSubmit(event) {
        event.preventDefault();
        api.addReservation(sessionId, addReservationFormData)
            .then((response) => {

            }).catch((error) => {
            console.log(error);
        })
    }

    function ChangeClientReservationData(event) {
        const {name, value} = event.target;
        setAddReservationFormData((addReservationFormData) => ({
                ...addReservationFormData,
                [name]: value
            })
        );
    }

    const HandleCheckboxChange = name => event => {
        setAddReservationFormData({ ...addReservationFormData, [name]: event.target.checked });
    };

    const ChangeAddReservationBeginDate = date => {
        setAddReservationFormData((addReservationFormData) => ({
                ...addReservationFormData,
                Begin: date
            })
        );
    };

    return (
        <div>
            <Typography variant="h4" align="center">
                Add reservation
            </Typography>
            <hr />
            <br />
            <form onSubmit={AddReservationOnSubmit}>
                <Grid container spacing={3}>
                    <Grid item lg={4} sm={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                fullWidth
                                name="Begin"
                                label="Begin"
                                value={addReservationFormData.Begin}
                                onChange={ChangeAddReservationBeginDate}
                                format="yyyy/MM/dd HH:mm"
                                ampm={false}
                                showTodayButton
                                disablePast
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item lg={4} sm={12}>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="Duration"
                            name="Duration"
                            value={addReservationFormData.Duration}
                            onChange={ChangeClientReservationData}
                        />
                    </Grid>
                    <Grid item lg={4} sm={12}>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="Distance"
                            name="Distance"
                            value={addReservationFormData.Distance}
                            onChange={ChangeClientReservationData}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={addReservationFormData.Rimfire} onChange={HandleCheckboxChange('Rimfire')} value="Rimfire" />}
                                label="Rimfire"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={addReservationFormData.Centerfire} onChange={HandleCheckboxChange('Centerfire')} value="Centerfire" />}
                                label="Centerfire"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={addReservationFormData.Shell} onChange={HandleCheckboxChange('Shell')} value="Shell" />}
                                label="Shell"
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <br />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddOutlinedIcon />}
                        type="submit"
                        fullWidth
                    >
                        Add reservation
                    </Button>
                </div>
            </form>
        </div>
    )
}
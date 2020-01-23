import React, {useContext, useEffect, useState} from "react";
import api from ".//api";
import authContext from "../../store";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

export default function ClientShow() {
    const [{ sessionId }] = useContext(authContext);
    const [clientData, setClientData] = useState({
        data: {
            FirstName: '',
            LastName: '',
            GunPermissionNumber: '',
            GunPermissionPublisher: '',
            PerceptorIdentityNumber: '',
            PerceptorIdentityPublisher: '',
            Email: '',
            AcceptedRegulationsId: ''
        }
    });

    useEffect(() => {
        GetClientInformations();
    }, []);

    function GetClientInformations() {
        api.getAccountInfo(sessionId)
            .then((response) => {
            setClientData({ data: response.data });
            }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <Typography variant="h4" align="center">
                Informations about account
            </Typography>
            <hr />
            <br />
            <Grid justify="center" container spacing={3}>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="FirstName"
                        value={clientData.data.FirstName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="LastName"
                        value={clientData.data.LastName}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="Email"
                        value={clientData.data.Email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Accepted Regulations Id"
                        name="AcceptedRegulationsId"
                        value={clientData.data.AcceptedRegulationsId}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Gun Permission Number"
                        name="GunPermissionNumber"
                        value={clientData.data.GunPermissionNumber}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Gun Permission Publisher"
                        name="GunPermissionPublisher"
                        value={clientData.data.GunPermissionPublisher}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Perceptor Identity Number"
                        name="PerceptorIdentityNumber"
                        value={clientData.data.PerceptorIdentityNumber}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Perceptor Identity Publisher"
                        name="PerceptorIdentityPublisher"
                        value={clientData.data.PerceptorIdentityPublisher}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    )

}
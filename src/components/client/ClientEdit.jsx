import React, {useContext, useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import authContext from "../../store";
import api from ".//api";
import SaveOutlined from "@material-ui/icons/Save";

export default function ClientEdit() {
    const [{ sessionId }] = useContext(authContext);
    const [editClientFormData, setEditClientFormData] = useState({
        FirstName: '',
        LastName: '',
        GunPermissionNumber: '',
        GunPermissionPublisher: '',
        PerceptorIdentityNumber: '',
        PerceptorIdentityPublisher: '',
        Email: ''
    });

    useEffect(() => {
        GetClientInformations();
    }, []);

    function GetClientInformations() {
        api.getAccountInfo(sessionId)
            .then((response) => {
                setEditClientFormData({
                    FirstName: response.data.FirstName,
                    LastName: response.data.LastName,
                    GunPermissionNumber: response.data.GunPermissionNumber,
                    GunPermissionPublisher: response.data.GunPermissionPublisher,
                    PerceptorIdentityNumber: response.data.PerceptorIdentityNumber,
                    PerceptorIdentityPublisher: response.data.PerceptorIdentityPublisher,
                    Email: response.data.Email
                });
            }).catch((error) => {
            console.log(error)
        })
    }

    function EditClientFormSubmit(event) {
        event.preventDefault();
        api.editAccount(sessionId, editClientFormData)
            .then((response) => {

            }).catch((error) => {
            console.log(error)
        });
    }

    function ChangeClientData(event) {
        const {name, value} = event.target;
        setEditClientFormData((editClientFormData) => ({
                ...editClientFormData,
                [name]: value
            })
        );
    }

    return (
        <div>
            <Typography variant="h4" align="center">
                Edit account data
            </Typography>
            <hr />
            <br />
            <form onSubmit={EditClientFormSubmit}>
                <Grid justify="center" container spacing={3}>
                    <Grid item md={6} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            id="standard-basic"
                            label="First Name"
                            name="FirstName"
                            value={editClientFormData.FirstName}
                            onChange={ChangeClientData}
                        />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="LastName"
                            value={editClientFormData.LastName}
                            onChange={ChangeClientData}
                        />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="Email"
                            value={editClientFormData.Email}
                            onChange={ChangeClientData}
                        />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <span></span>
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Gun Permission Number"
                            name="GunPermissionNumber"
                            value={editClientFormData.GunPermissionNumber}
                            onChange={ChangeClientData}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Gun Permission Publisher"
                            name="GunPermissionPublisher"
                            value={editClientFormData.GunPermissionPublisher}
                            onChange={ChangeClientData}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Perceptor Identity Number"
                            name="PerceptorIdentityNumber"
                            value={editClientFormData.PerceptorIdentityNumber}
                            onChange={ChangeClientData}
                        />
                    </Grid>
                    <Grid item md={3} sm={6} xs={12}>
                        <TextField
                            fullWidth
                            label="Perceptor Identity Publisher"
                            name="PerceptorIdentityPublisher"
                            value={editClientFormData.PerceptorIdentityPublisher}
                            onChange={ChangeClientData}
                        />
                    </Grid>
                </Grid>
                <br />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveOutlined />}
                        type="submit"
                        fullWidth
                    >
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    )
}
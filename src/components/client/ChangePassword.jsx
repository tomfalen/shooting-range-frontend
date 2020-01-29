import React, {useContext, useState} from "react";
import api from "./api";
import authContext from "../../store";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SaveOutlined from "@material-ui/icons/Save";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";

export default function ChangePassword() {
    const [{sessionId}] = useContext(authContext);
    const [changePasswordFormData, setChangePasswordFormData] = useState({
        OldPassword: '',
        NewPassword: ''
    });
    const [values, setValues] = React.useState({
        showOldPassword: false,
        showNewPassword: false
    });

    function ChangePasswordFormSubmit(event) {
        event.preventDefault();
        api.changePassword(sessionId, changePasswordFormData)
            .then((response) => {
                setChangePasswordFormData({
                    OldPassword: '',
                    NewPassword: ''
                })
            }).catch((error) => {
            console.log(error)
        });
    }

    const handleClickShowOldPassword = () => {
        setValues({...values, showOldPassword: !values.showOldPassword});
    };
    const handleMouseDownOldPassword = event => {
        event.preventDefault();
    };
    const handleClickShowNewPassword = () => {
        setValues({...values, showNewPassword: !values.showNewPassword});
    };
    const handleMouseDownNewPassword = event => {
        event.preventDefault();
    };
    const handleChange = prop => event => {
        setChangePasswordFormData({...changePasswordFormData, [prop]: event.target.value});
    };

    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        }
    }));
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h4" align="center">
                Change password
            </Typography>
            <hr/>
            <br/>
            <form onSubmit={ChangePasswordFormSubmit}>
                <Grid justify="center" container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl className={clsx(classes.margin)}>
                            <InputLabel htmlFor="old-password">Old password</InputLabel>
                            <Input
                                fullWidth
                                id="old-password"
                                type={values.showOldPassword ? 'text' : 'password'}
                                value={changePasswordFormData.OldPassword}
                                onChange={handleChange('OldPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowOldPassword}
                                            onMouseDown={handleMouseDownOldPassword}
                                        >
                                            {values.showOldPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin)}>
                            <InputLabel htmlFor="new-password">New password</InputLabel>
                            <Input
                                fullWidth
                                id="new-password"
                                type={values.showNewPassword ? 'text' : 'password'}
                                value={changePasswordFormData.NewPassword}
                                onChange={handleChange('NewPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={handleMouseDownNewPassword}
                                        >
                                            {values.showNewPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveOutlined/>}
                        type="submit"
                    >
                        Change password
                    </Button>
                </Grid>
            </form>
        </div>
    )
}
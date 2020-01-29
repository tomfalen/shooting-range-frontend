import React, { useState, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import authContext from './../../store';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import authApi from './authApi';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        FirstName: '',
        LastName: '',
        GunPermissionNumber: '',
        GunPermissionPublisher: '',
        PerceptorIdentityNumber: '',
        PerceptorIdentityPublisher: '',
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


    const classes = useStyles();

    function onSubmit(event) {
        event.preventDefault();
        authApi.register(formData)
            .then((response) => {
                console.log(response)
                dispatch({
                    type: 'REGISTER',
                    payload: {
                        response
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: 'REGISTER_ERROR',
                    payload: {
                    }
                });
            })
    }

    function onChange(event) {
        const { name, value } = event.target;
        setFormData((formData) => ({
            ...formData,
            [name]: value
        }));
    }

    return (
        <Fragment>
            {isLoggedIn ? (
                <Redirect to="/" />
            ) : (
                    <Fragment>
                        <Container component="main" className={'registerForm'} maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Zarejestruj
                                </Typography>
                                <form className={classes.form} onSubmit={onSubmit} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="fname"
                                                name="FirstName"
                                                value={formData.FirstName}
                                                onChange={onChange}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="Imię"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Nazwisko"
                                                name="LastName"
                                                value={formData.LastName}
                                                onChange={onChange}
                                                autoComplete="lname"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="username"
                                                name="username"
                                                value={formData.username}
                                                onChange={onChange}
                                                label="Nazwa użytkownika"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Hasło"
                                                value={formData.password}
                                                onChange={onChange}
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="fname"
                                                name="GunPermissionNumber"
                                                value={formData.GunPermissionNumber}
                                                onChange={onChange}
                                                placeholder="GunPermissionNumber"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="GunPermissionNumber"
                                                label="Numer pozw. na broń"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="GunPermissionPublisher"
                                                name="GunPermissionPublisher"
                                                value={formData.GunPermissionPublisher}
                                                onChange={onChange}
                                                label="Organ wyd. nr pozw. na broń"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete="fname"
                                                name="PerceptorIdentityNumber"
                                                value={formData.PerceptorIdentityNumber}
                                                onChange={onChange}
                                                label="Numer leg. prow. strzelanie"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="PerceptorIdentityNumber"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="PerceptorIdentityPublisher"
                                                name="PerceptorIdentityPublisher"
                                                value={formData.PerceptorIdentityPublisher}
                                                onChange={onChange}
                                                label="Organ wyd. leg. prow. strzelanie"
                                                autoComplete="lname"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                name="Email"
                                                value={formData.Email}
                                                onChange={onChange}
                                                label="Adres e-mail"
                                                id="Email"
                                                autoComplete="current-password"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Zarejestruj
                                </Button>
                                </form>
                            </div>
                        </Container>
                    </Fragment>
                )}
        </Fragment>
    );
};

export default RegisterForm;
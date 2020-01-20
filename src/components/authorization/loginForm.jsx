import React, { useState, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import authContext from './../../store';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import authApi from './authApi.js';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	});
	const [{ isLoggedIn, error }, dispatch] = useContext(authContext);
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
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));
	const classes = useStyles();

	function onSubmit(event) {
		event.preventDefault();

		authApi.login(formData)
			.then((response) => {
				console.log(response)
				dispatch({
					type: 'LOGIN',
					payload: {
						sessionId: response.data.SessionId,
						IsWorker: response.data.IsWorker,
						permissions: response.data.Permissions
					}
				});
			})
			.catch((error) => {
				dispatch({
					type: 'LOGIN_ERROR',
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
						{error && <p className="error">{error}</p>}
							<Container component="main" maxWidth="xs">
								<CssBaseline />
								<div className={classes.paper}>
									<Avatar className={classes.avatar}>
										<LockOutlinedIcon />
									</Avatar>
									<Typography component="h1" variant="h5">
										Sign in
        							</Typography>
									<form className={classes.form} onSubmit={onSubmit} noValidate>
										<TextField
											variant="outlined"
											margin="normal"
											required
											fullWidth
											id="email"
											label="Email Address"
											value={formData.username}
											onChange={onChange}
											name="username"
											autoComplete="email"
											autoFocus
										/>
										<TextField
											variant="outlined"
											margin="normal"
											required
											fullWidth
											name="password"
											label="Password"
											value={formData.password}
											onChange={onChange}
											type="password"
											id="password"
											autoComplete="current-password"
										/>
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className={classes.submit}
										>
											Sign In
         							 </Button>
									</form>
								</div>

							</Container>
					</Fragment>
				)}
		</Fragment>
	);
};

export default LoginForm;
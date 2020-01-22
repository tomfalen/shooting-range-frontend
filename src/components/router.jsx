import React, { useContext } from 'react';
import authContext from '../store';
import '../App.css';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';

import LoginForm from './authorization/loginForm';
import RegisterForm from './authorization/registerForm';
import WorkerManager from './workers/WorkerManager';
import WorkerAccount from './account/workerAccount';
import ClientDashboard from "./client/Dashboard";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import authApi from './authorization/authApi';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		marginBottom: 50,
	},
}));

const Navigation = () => {
	const [{ isLoggedIn, sessionId, isWorker }, dispatch] = useContext(authContext);
	const logOut = () => {
		authApi.logout(sessionId)
			.then((response) => {
				console.log(response)
				dispatch({
					type: 'LOGOUT',
					payload: {

					}
				});
			})
			.catch((error) => {
				console.log(error)
				dispatch({
					type: 'REGISTER_ERROR',
					payload: {

					}
				});
			})
	};

	const classes = useStyles()

	return (
		<section id="main">
			<Router>
				<AppBar position="static" className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							<Button color="inherit" component={Link} to="/">
								Home
			  				</Button>
						</Typography>
						{isLoggedIn ? (
							<p>
								{true ? (
									<p>
									<Button color="inherit" component={Link} to="/ClientDashboard">
										Client
									</Button>
									<Button color="inherit" component={Link} to="/WorkerManager">
										WorkerManager
									</Button>
									<Button color="inherit" component={Link} to="/WorkerAccount">
										Account
									</Button>
									<Button color="inherit" onClick={logOut} component={Link} to="/">
									Logout
									</Button>
									</p>
								):(
								<p>

								</p>)}

							</p>
						) : (
								<p>
									<Button color="inherit" component={Link} to="/login">
										Login
									</Button>
									<Button color="inherit" component={Link} to="/register">
										Register
									</Button>
								</p>
							)}
					</Toolbar>
				</AppBar>

				<Switch>
					<Route exact path="/" />
					<Route exact path="/WorkerAccount" component={WorkerAccount} />
					<Route exact path="/login" component={LoginForm} />
					<Route exact path="/register" component={RegisterForm} />
					<Route exact path="/WorkerManager" component={WorkerManager} />
					<Route exact path="/ClientDashboard" component={ClientDashboard} />
				</Switch>
			</Router>
		</section>
	)
};
export default Navigation;
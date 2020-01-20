import React, { useContext } from 'react';
import authContext from '../store';
import '../App.css';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './Hello';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import WorkerManager from './workers/WorkerManager';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import Axios from 'axios';

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
  }));

  const Navigation = () =>  {
	const [ { isLoggedIn, sessionId, IsWorker }, dispatch ] = useContext(authContext);
    const logOut = () => {
        Axios.post("http://sokres.ddns.net:50101/user/logout", { }, 
              {
                  headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": sessionId
                  }
              }).then((response) => {
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
	   	<AppBar position="static">
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
					<Button color="inherit" component={Link} to="/WorkerManager">
					WorkerManager
					</Button>
					<Button color="inherit" onClick={logOut} component={Link} to="/">
					Logout
					</Button>
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
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={LoginForm} />
				<Route exact path="/register" component={RegisterForm} />
				<Route exact path="/WorkerManager" component={WorkerManager} />
			</Switch>
		</Router>
	</section>
	)
};
export default Navigation;